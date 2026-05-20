import pino from "pino";
import { pinoHttp } from "pino-http";
import fs from "node:fs";
import pretty from "pino-pretty";


const LOGS_DIR = "./logs";
const COMBINED_LOG = `${LOGS_DIR}/combined.log`;
const ERRORS_LOG = `${LOGS_DIR}/errors.log`;

const logLevel = process.env.LOGGER_LEVEL || 'info';

if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const prettyStream = pretty({
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
    singleLine: false,
});

const streams: pino.StreamEntry[] = [
    { 
        level: logLevel as pino.Level, 
        stream: prettyStream 
    },
    { 
        level: logLevel as pino.Level, 
        stream: pino.destination({ dest: COMBINED_LOG, sync: true }) 
    },
    { 
        level: 'error', 
        stream: pino.destination({ dest: ERRORS_LOG, sync: true }) 
    }
];

const logger = pino({ level: logLevel }, pino.multistream(streams));

export const httpLogger = pinoHttp({
    logger,
    customSuccessMessage: (req, res, responseTime) => {
        return `${req.method} ${req.url} ${res.statusCode} - ${responseTime}ms`;
    },
    customErrorMessage: (req, res, err) => {
        return `${req.method} ${req.url} ${res.statusCode} - Error: ${err.message}`;
    }
});

export default logger;