import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ZodError } from 'zod';
import authRouter from './modules/auth/auth.routes.js';
import logger from './utils/pino-logger.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Standard Middlewares
app.use(cors());
app.use(express.json()); // Essential for parsing req.body

// Request logging middleware (optional, but highly recommended for debugging)
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Mount Authentication Routes
app.use('/api/auth', authRouter);

// Basic Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

/**
 * Global Error Handling Middleware (Express 5 style)
 * Catches all sync/async errors thrown from controllers and services
 */
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  // 1. Handle Zod validation errors from @driveflow/shared schemas
  if (err instanceof ZodError) {
    logger.warn(`Validation failed: ${JSON.stringify(err.errors)}`);
    res.status(400).json({
      error: 'Validation Error',
      // Format errors nicely: { fieldName: "Error message" }
      details: err.errors.reduce((acc: Record<string, string>, current) => {
        const path = current.path.join('.');
        acc[path] = current.message;
        return acc;
      }, {}),
    });
    return;
  }

  // 2. Handle standard business logic errors (thrown with `throw new Error('...')`)
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start the Express Server
app.listen(PORT, () => {
  logger.info(`🚀 DriveFlow Backend is running on http://localhost:${PORT}`);
});

export default app;