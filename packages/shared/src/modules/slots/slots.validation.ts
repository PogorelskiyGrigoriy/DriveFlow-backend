import { z } from 'zod';
import { DATE_YYYY_MM_DD_REGEX } from '../../utils/validation-regex.js';

/**
 * Validation schema for fetching available slots on a specific date
 */
export const getAvailableSlotsQuerySchema = z.object({
  instructorId: z
    .uuid('Invalid instructor ID format'),
  date: z
    .string()
    .regex(DATE_YYYY_MM_DD_REGEX, 'Date must be in YYYY-MM-DD format'),
});

export type GetAvailableSlotsQuery = z.infer<typeof getAvailableSlotsQuerySchema>;