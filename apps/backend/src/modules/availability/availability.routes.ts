import { Router } from 'express';
import { AvailabilityServiceImpl } from './availability.service.impl.js';
import { AvailabilityController } from './availability.controller.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();
const availabilityService = new AvailabilityServiceImpl();
const controller = new AvailabilityController(availabilityService);

// Route configuration
router.get('/', authenticateJwt, controller.getAvailability);
router.put('/', authenticateJwt, controller.updateAvailability);
router.post('/publish', authenticateJwt, controller.publishAvailability);

export default router;