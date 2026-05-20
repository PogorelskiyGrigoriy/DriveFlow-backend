import { z } from 'zod';
import { DATE_YYYY_MM_DD_REGEX } from '../../utils/validation-regex.js';

/**
 * URL query parameters validation schema for fetching open driving lesson timeslots.
 */
export const GetAvailableSlotsQuerySchema = z.object({
  instructorId: z
    .string()
    .uuid('Invalid instructor ID format'),
  date: z
    .string()
    .regex(DATE_YYYY_MM_DD_REGEX, 'Date must be in YYYY-MM-DD format'),
});

/**
 * Inferred type for the available slots query parameters.
 */
export type GetAvailableSlotsQueryInput = z.infer<typeof GetAvailableSlotsQuerySchema>;