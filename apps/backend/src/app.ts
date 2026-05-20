import 'dotenv/config';

import express, { Request, Response } from 'express';
import cors from 'cors';
import authRouter from './modules/auth/auth.routes.js';
import slotRouter from './modules/slots/slot.routes.js';
import lessonRouter from './modules/lessons/lesson.routes.js';
import availabilityRoutes from './modules/availability/availability.routes.js';
import studentsRouter from './modules/students/students.routes.js';
import logger, { httpLogger } from './utils/pino-logger.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { globalRateLimiter, authRateLimiter } from './middlewares/rate-limiter.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Standard Middlewares & Automated HTTP Infrastructure Logging
app.use(httpLogger);
app.use(globalRateLimiter);
app.use(cors());
app.use(express.json());

// Mount Feature Routes
app.use('/api/auth', authRateLimiter, authRouter);
app.use('/api/slots', slotRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/instructor/availability', availabilityRoutes);
app.use('/api/instructor/students', studentsRouter);

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