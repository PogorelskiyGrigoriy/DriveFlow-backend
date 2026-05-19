import { z } from 'zod';

/**
 * Validates a single day's schedule entry.
 * Ensures realistic 24-hour boundaries.
 */
export const dayAvailabilitySchema = z.object({
  dayOfWeek: z.number().int().min(0).max(5, 'Allowed days are 0 (Sunday) to 5 (Friday)'),
  startHour: z.number().int().min(0).max(23, 'Hour must be between 0 and 23'),
  endHour: z.number().int().min(0).max(23, 'Hour must be between 0 and 23'),
}).refine(
  (data) => data.startHour < data.endHour,
  { message: 'Start hour must be strictly before end hour', path: ['endHour'] }
);

/**
 * Validates the full PUT request body.
 * Expects a clean array of unique working days.
 */
export const updateAvailabilitySchema = z.object({
  schedule: z.array(dayAvailabilitySchema)
    .refine(
      (days) => new Set(days.map((d) => d.dayOfWeek)).size === days.length,
      { message: 'Duplicate days are not allowed inside the schedule array' }
    ),
});

export type UpdateAvailabilityInput = z.infer<typeof updateAvailabilitySchema>;