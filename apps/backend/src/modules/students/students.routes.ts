import { Router } from 'express';
import { StudentsServiceImpl } from './students.service.impl.js';
import { StudentsController } from './students.controller.js';
import { authenticateJwt, requireRole } from '../../middlewares/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();
const studentsService = new StudentsServiceImpl();
const controller = new StudentsController(studentsService);

// Get all active students with metrics for the instructor
router.get('/', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.getStudents);

// Get a single active student profile by ID
router.get('/:id', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.getStudentById);

// Register a new student record
router.post('/', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.createStudent);

// Update basic student profile details
router.put('/:id', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.updateStudent);

// Archive or hard-delete a student based on lesson history
router.delete('/:id', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.archiveStudent);

// Generate and log a new Magic Sign-In Link for a student
router.post('/:id/invite', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.inviteStudent);

export default router;