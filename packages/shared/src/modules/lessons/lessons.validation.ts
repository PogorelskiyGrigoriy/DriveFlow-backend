import { z } from 'zod';
import { LessonStatus } from '@prisma/client';

/**
 * Validation schema for booking a new driving lesson.
 * Coerces the network ISO string into a native Date object for backend operations.
 */
export const CreateLessonSchema = z.object({
  instructorId: z.uuid('Invalid instructor ID format'),
  studentId: z.uuid('Invalid student ID format'),
  startTime: z.coerce.date({
    message: 'Start time must be a valid date or ISO 8601 string',
    error: 'Start time must be a valid ISO 8601 string',
  }),
});

/**
 * Validation schema for mutating a lesson's operational state.
 * Restricts updates strictly to valid Prisma LessonStatus enums.
 */
export const UpdateLessonStatusSchema = z.object({
  status: z.enum(LessonStatus, { 
    message: 'Invalid status. Must be SCHEDULED, COMPLETED, or CANCELLED' 
  }),
});

export type CreateLessonInput = z.infer<typeof CreateLessonSchema>;
export type UpdateLessonStatusInput = z.infer<typeof UpdateLessonStatusSchema>;