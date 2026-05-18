import { z } from 'zod';

/**
 * Strict validation schema for booking a new driving lesson
 */
export const createLessonSchema = z.object({
  instructorId: z
    .uuid('Invalid instructor ID format'),
  studentId: z
    .uuid('Invalid student ID format'),
  startTime: z
    .iso
    .datetime({ message: 'Start time must be a valid ISO 8601 datetime string' }),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;