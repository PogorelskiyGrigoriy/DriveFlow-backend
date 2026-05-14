/**
 * @module EnvConfig
 * Environment variables validation and configuration.
 */
import dotenv from "dotenv";
import { z } from "zod";


dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  // Database (SQL validation)
  DATABASE_URL: z.string().url("Invalid DATABASE_URL format. Must be a valid SQL connection string."),  
  // Authentication
  JWT_SECRET: z.string().min(8, "JWT_SECRET must be at least 8 characters"),
  JWT_EXPIRES_IN: z.string().default("2h"),
  // Telegram (Placeholder for future WhatsApp integration)
  TELEGRAM_BOT_TOKEN: z.string().min(1, "TELEGRAM_BOT_TOKEN is required"),
  // Logging
  LOGGER_LEVEL: z.enum(['info', 'error', 'debug', 'warn', 'trace', 'fatal']).default('info'),
});

// Parse and validate process.env
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables configuration:");
  _env.error.issues.forEach((issue) => {
    console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

// Critical production security check
if (_env.data.NODE_ENV === "production" && _env.data.JWT_SECRET.length < 32) {
  console.error("FATAL: JWT_SECRET must be at least 32 characters in production for security!");
  process.exit(1);
}

export const ENV = _env.data;