import { Router } from 'express';
import { AvailabilityServiceImpl } from './availability.service.impl.js';
import { AvailabilityController } from './availability.controller.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();
const availabilityService = new AvailabilityServiceImpl();
const controller = new AvailabilityController(availabilityService);

/**
 * Route to fetch the logged-in instructor's schedule grid
 * GET /api/instructor/availability
 */
router.get('/', authenticateJwt, controller.getAvailability);

/**
 * Route to completely overwrite the instructor's schedule grid
 * PUT /api/instructor/availability
 */
router.put('/', authenticateJwt, controller.updateAvailability);

/**
 * Route to trigger broadcast notifications (Magic Links) to all assigned students
 * POST /api/instructor/availability/publish
 */
router.post('/publish', authenticateJwt, controller.publishAvailability);

export default router;