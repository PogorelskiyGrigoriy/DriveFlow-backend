import rateLimit from 'express-rate-limit';
import { AppError } from '../utils/app-errors.js';

/**
 * Global rate limiter for standard API endpoints.
 * Permissive enough for normal driving school dashboard interactions.
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next) => {
    next(new AppError('Too many requests from this IP, please try again later.', 429, 'FORBIDDEN'));
  },
});

/**
 * Strict rate limiter dedicated to authentication and magic link generation.
 * Prevents automated brute-force attacks and bulk SMS/WhatsApp spamming.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Limit each IP to 5 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new AppError('Too many authentication attempts. Please try again after 15 minutes.', 429, 'FORBIDDEN'));
  },
});