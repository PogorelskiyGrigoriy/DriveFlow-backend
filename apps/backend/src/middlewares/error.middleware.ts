import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/app-errors.js';
import type { ApiErrorResponse, AppErrorCode } from '@driveflow/shared';
import logger from '../utils/pino-logger.js';
import { ZodError } from 'zod';

/**
 * Global Error Handling Middleware.
 * Standardizes all error responses across the backend according to the ApiErrorResponse contract.
 */
export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  // 1. Default fallback configurations for unhandled (500) internal errors
  let statusCode = 500;
  let code: AppErrorCode = 'SERVER_ERROR';
  let message = 'Internal Server Error';
  let details: unknown = null;

  // 2. Classify and map incoming exceptions
  if (err instanceof AppError) {
    /** Handle known operational business logic errors (404, 409, 401, etc.) */
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
    details = err.details;

    logger.warn({ code, message, path: req.path }, 'Operational error caught');
  } 
  else if (err instanceof ZodError) {
    /** Handle contract schema validation exceptions from Zod */
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Request validation failed';
    details = err.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    }));

    logger.warn({ path: req.path, issues: details }, 'Schema validation error triggered');
  } 
  else {
    /** Handle critical unexpected native system failures (runtime crashes, DB disconnects) */
    logger.error(
      { 
        err: { message: err.message, stack: err.stack }, 
        path: req.path 
      }, 
      'Unhandled systemic application exception'
    );
  }

  // 3. Assemble unified payload adhering strictly to the shared API design contract
  const response: ApiErrorResponse = {
    error: message,
    code,
    details,
    timestamp: new Date().toISOString(),
  };

  // 4. Dispatch response payload
  res.status(statusCode).json(response);
};