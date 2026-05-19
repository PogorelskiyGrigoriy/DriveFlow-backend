import { Request, Response } from 'express';
import { ILessonService } from './lesson.service.js';
import { createLessonSchema, updateLessonStatusSchema } from '@driveflow/shared';

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

  /**
   * HTTP Handler to update the status of an existing lesson.
   * Expected route: PATCH /api/lessons/:id/status
   */
  updateLessonStatus = async (req: Request, res: Response): Promise<void> => {
    // 1. Extract target lesson ID from the URL parameter
    const lessonId = req.params.id as string;

    // 2. Validate the incoming body (strictly checking for valid LessonStatus enum)
    const validatedInput = updateLessonStatusSchema.parse(req.body);

    // 3. Extract user security context safely injected by the authenticateJwt middleware.
    const userId = req.user.id;
    const userRole = req.user.role;

    // 4. Delegate to the business logic layer where all rules are enforced
    const result = await this.lessonService.updateLessonStatus(
      lessonId,
      validatedInput,
      userId,
      userRole
    );

    // 5. Respond with 200 OK and the updated lesson DTO
    res.status(200).json(result);
  };

  /**
   * HTTP Handler to get personal lessons for the logged-in student.
   * Expected route: GET /api/lessons/my
   */
  getUserLessons = async (req: Request, res: Response): Promise<void> => {
    const studentId = req.user.id;
    
    const result = await this.lessonService.getUserLessons(studentId);
    res.status(200).json(result);
  };

  /**
   * HTTP Handler to get an instructor's linear schedule for a specific day.
   * Expected route: GET /api/lessons/schedule?date=YYYY-MM-DD
   */
  getInstructorSchedule = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user.id;
    const dateStr = req.query.date as string;

    if (!dateStr) {
      res.status(400).json({ error: 'Query parameter "date" is required.' });
      return;
    }

    // Pass the instructor's ID and the date string to the service
    const result = await this.lessonService.getInstructorSchedule(instructorId, dateStr);
    res.status(200).json(result);
  };
}