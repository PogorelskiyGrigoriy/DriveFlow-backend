import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRouter from './modules/auth/auth.routes.js';
import slotRouter from './modules/slots/slot.routes.js';
import lessonRouter from './modules/lessons/lesson.routes.js';
import logger from './utils/pino-logger.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Standard Middlewares
app.use(cors());
app.use(express.json()); // Essential for parsing req.body

// Request logging middleware for backend activity tracking
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Mount Feature Routes
app.use('/api/auth', authRouter);
app.use('/api/slots', slotRouter);
app.use('/api/lessons', lessonRouter);

// Basic Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

/**
 * Global Error Handling Middleware Pipeline
 * Intercepts all validation and operational failures downstream
 */
app.use(errorMiddleware);

// Start the Express Server
app.listen(PORT, () => {
  logger.info(`DriveFlow Backend is running on http://localhost:${PORT}`);
});

export default app;