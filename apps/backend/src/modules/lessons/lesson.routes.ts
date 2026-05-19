import { Router } from 'express';
import { LessonServiceImpl } from './lesson.service.impl.js';
import { LessonController } from './lesson.controller.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();
const lessonService = new LessonServiceImpl();
const controller = new LessonController(lessonService);

/**
 * Route for booking a driving lesson
 * POST /api/lessons
 * Secured by global JWT Authentication Guard
 */
router.post('/', authenticateJwt, controller.createLesson);

/**
 * Route for updating a lesson's operational status (Cancel / Complete)
 * PATCH /api/lessons/:id/status
 * Secured by global JWT Authentication Guard
 */
router.patch('/:id/status', authenticateJwt, controller.updateLessonStatus);

export default router;