import { Request, Response } from 'express';
import { ILessonService } from './lesson.service.js';
import { createLessonSchema } from '@driveflow/shared';

export class LessonController {
  constructor(private lessonService: ILessonService) {}

  /**
   * HTTP Handler to book a new driving lesson.
   * Body payload is validated against the schema derived from Prisma.
   */
  createLesson = async (req: Request, res: Response): Promise<void> => {
    // 1. Validate and coerce incoming body (e.g., converts ISO string startTime to JS Date)
    const validatedInput = createLessonSchema.parse(req.body);

    // 2. Pass clean data to the business logic layer
    const result = await this.lessonService.createLesson(validatedInput);

    // 3. Respond with 201 Created and the unified DTO payload
    res.status(201).json(result);
  };
}