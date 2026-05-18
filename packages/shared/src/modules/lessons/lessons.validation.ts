import { LessonSchema } from '../../generated/zod/index.js';
import { z } from 'zod';

/**
 * Modernized validation schema for booking a new driving lesson.
 */
export const createLessonSchema = LessonSchema.pick({
  instructorId: true,
  studentId: true,
  startTime: true,
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;