import { Request, Response } from 'express';
import { ILessonService } from './lesson.service.js';
import { CreateLessonSchema, UpdateLessonStatusSchema } from '@driveflow/shared';

export class LessonController {
  constructor(private lessonService: ILessonService) {}

  /**
   * HTTP Handler to book a new driving lesson.
   */
  createLesson = async (req: Request, res: Response): Promise<void> => {
    const validatedInput = CreateLessonSchema.parse(req.body);
    
    // SECURITY: Force extraction of student ID from the verified JWT token
    const studentId = req.user!.id;

    const result = await this.lessonService.createLesson({
      ...validatedInput,
      studentId, 
    });

    res.status(201).json(result);
  };

  /**
   * HTTP Handler to update the status of an existing lesson.
   */
  updateLessonStatus = async (req: Request, res: Response): Promise<void> => {
    const lessonId = req.params.id as string;
    const validatedInput = UpdateLessonStatusSchema.parse(req.body);

    const userId = req.user!.id;
    const userRole = req.user!.role;

    const result = await this.lessonService.updateLessonStatus(
      lessonId,
      validatedInput,
      userId,
      userRole
    );

    res.status(200).json(result);
  };

  /**
   * HTTP Handler to get personal lessons for the logged-in student.
   */
  getUserLessons = async (req: Request, res: Response): Promise<void> => {
    const studentId = req.user!.id;
    const result = await this.lessonService.getUserLessons(studentId);
    res.status(200).json(result);
  };

  /**
   * HTTP Handler to get an instructor's linear schedule for a specific day.
   */
  getInstructorSchedule = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id;
    const dateStr = req.query.date as string;

    if (!dateStr) {
      res.status(400).json({ error: 'Query parameter "date" is required.' });
      return;
    }

    const result = await this.lessonService.getInstructorSchedule(instructorId, dateStr);
    res.status(200).json(result);
  };
}