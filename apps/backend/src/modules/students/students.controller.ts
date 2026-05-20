import { Request, Response } from 'express';
import { IStudentsService } from './students.service.js';
import { CreateStudentSchema, UpdateStudentSchema } from '@driveflow/shared';

export class StudentsController {
  constructor(private studentsService: IStudentsService) {}

  getStudents = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id;
    const data = await this.studentsService.getInstructorStudents(instructorId);
    res.status(200).json(data);
  };

  getStudentById = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id;
    const studentId = req.params.id as string;
    const data = await this.studentsService.getStudentById(instructorId, studentId);
    res.status(200).json(data);
  };

  createStudent = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id;
    const input = CreateStudentSchema.parse(req.body); 
    const data = await this.studentsService.createStudent(instructorId, input);
    res.status(201).json(data);
  };

  updateStudent = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id;
    const studentId = req.params.id as string;
    const input = UpdateStudentSchema.parse(req.body);
    const data = await this.studentsService.updateStudent(instructorId, studentId, input);
    res.status(200).json(data);
  };

  archiveStudent = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id;
    const studentId = req.params.id as string;
    const data = await this.studentsService.archiveStudent(instructorId, studentId);
    res.status(200).json(data);
  };

  inviteStudent = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id;
    const studentId = req.params.id as string;
    const data = await this.studentsService.inviteStudent(instructorId, studentId);
    res.status(200).json(data);
  };
}