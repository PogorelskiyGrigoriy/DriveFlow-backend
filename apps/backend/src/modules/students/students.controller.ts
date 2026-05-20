import { Request, Response, NextFunction } from 'express';
import { IStudentsService } from './students.service.js';
import { CreateStudentSchema, UpdateStudentSchema } from '@driveflow/shared';

export class StudentsController {
  // Внедрение зависимости (Dependency Injection), как в других контроллерах
  constructor(private studentsService: IStudentsService) {}

  getStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const instructorId = req.user!.id;
      const data = await this.studentsService.getInstructorStudents(instructorId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getStudentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const instructorId = req.user!.id;
      const studentId = req.params.id as string;
      const data = await this.studentsService.getStudentById(instructorId, studentId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const instructorId = req.user!.id;
      
      // Валидация Zod напрямую в контроллере (заменяет validateBody)
      const input = CreateStudentSchema.parse(req.body); 
      
      const data = await this.studentsService.createStudent(instructorId, input);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const instructorId = req.user!.id;
      const studentId = req.params.id as string;
      
      const input = UpdateStudentSchema.parse(req.body);
      
      const data = await this.studentsService.updateStudent(instructorId, studentId, input);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  archiveStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const instructorId = req.user!.id;
      const studentId = req.params.id as string;
      const data = await this.studentsService.archiveStudent(instructorId, studentId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  inviteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const instructorId = req.user!.id;
      const studentId = req.params.id as string;
      const data = await this.studentsService.inviteStudent(instructorId, studentId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}