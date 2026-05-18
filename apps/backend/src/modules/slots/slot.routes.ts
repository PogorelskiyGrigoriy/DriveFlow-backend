import { Router } from 'express';
import { SlotServiceImpl } from './slot.service.impl.js';
import { SlotController } from './slot.controller.js';
import { authenticateJwt } from '../../middlewares/auth.middleware.js';

const router = Router();
const slotService = new SlotServiceImpl();
const controller = new SlotController(slotService);

/**
 * Route to fetch open driving lesson timeslots
 * Secured by JWT authentication middleware
 * GET /api/slots/available?instructorId=UUID&date=YYYY-MM-DD
 */
router.get('/available', authenticateJwt, controller.getAvailableSlots);

export default router;