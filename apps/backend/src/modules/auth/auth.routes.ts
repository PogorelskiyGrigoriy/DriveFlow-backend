import { Router } from 'express';
import { AuthServiceImpl } from './auth.service.impl.js';
import { AuthController } from './auth.controller.js';

const router = Router();
const authService = new AuthServiceImpl();
const controller = new AuthController(authService);

// Authentication endpoints
router.post('/instructor/login', controller.loginInstructor);
router.post('/student/request-link', controller.requestMagicLink);
router.get('/student/verify', controller.verifyMagicLink);

export default router;