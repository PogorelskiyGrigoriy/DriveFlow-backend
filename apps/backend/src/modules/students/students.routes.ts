import { Router } from 'express';
import { StudentsServiceImpl } from './students.service.impl.js';
import { StudentsController } from './students.controller.js';
import { authenticateJwt, requireRole } from '../../middlewares/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();
const studentsService = new StudentsServiceImpl();
const controller = new StudentsController(studentsService);

/**
 * Route to get all active students with aggregated dashboard statistics
 * GET /api/instructor/students
 */
router.get('/', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.getStudents);

/**
 * Route to get a single active student profile by ID
 * GET /api/instructor/students/:id
 */
router.get('/:id', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.getStudentById);

/**
 * Route to create a new student record
 * POST /api/instructor/students
 */
router.post('/', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.createStudent);

/**
 * Route to update student records (firstName, lastName, phoneNumber)
 * PUT /api/instructor/students/:id
 */
router.put('/:id', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.updateStudent);

/**
 * Route to archive student (Soft-delete or Hard-delete based on lesson history)
 * DELETE /api/instructor/students/:id
 */
router.delete('/:id', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.archiveStudent);

/**
 * Route to generate and dispatch a separate Magic Link for a student
 * POST /api/instructor/students/:id/invite
 */
router.post('/:id/invite', authenticateJwt, requireRole(Role.INSTRUCTOR), controller.inviteStudent);

export default router;