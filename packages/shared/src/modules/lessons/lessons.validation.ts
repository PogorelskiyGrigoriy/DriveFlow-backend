import { LessonSchema } from '../../generated/zod/index.js';
import { LessonStatus } from '@prisma/client';
import { z } from 'zod';

/**
 * Modernized validation schema for booking a new driving lesson.
 * Derived directly from Prisma Generated Zod types.
 */
export const createLessonSchema = LessonSchema.pick({
  instructorId: true,
  studentId: true,
  startTime: true,
});

/**
 * Validation schema for mutating a lesson's operational state.
 * Restricts updates strictly to valid Prisma LessonStatus enums.
 */
export const updateLessonStatusSchema = z.object({
  status: z.enum(LessonStatus, { 
    message: 'Invalid status. Must be SCHEDULED, COMPLETED, or CANCELLED' 
  }),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonStatusInput = z.infer<typeof updateLessonStatusSchema>;