import { z } from 'zod';

/**
 * Validation schema for a single day's operational schedule entry.
 * Ensures realistic 24-hour boundaries and correct time flow.
 */
export const DayAvailabilitySchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6, 'Allowed days are 0 (Sunday) to 6 (Saturday)'),
  startHour: z.number().int().min(0).max(23, 'Hour must be between 0 and 23'),
  endHour: z.number().int().min(0).max(23, 'Hour must be between 0 and 23'),
}).refine(
  (data) => data.startHour < data.endHour,
  { message: 'Start hour must be strictly before end hour', path: ['endHour'] }
);

/**
 * Inferred type for an individual day's operational bounds config.
 */
export type DayAvailabilityInput = z.infer<typeof DayAvailabilitySchema>;

/**
 * Validation schema for the full availability PUT request body.
 * Expects a structured object containing a clean array of unique working days.
 */
export const UpdateAvailabilitySchema = z.object({
  schedule: z.array(DayAvailabilitySchema)
    .refine(
      (days) => new Set(days.map((d) => d.dayOfWeek)).size === days.length,
      { message: 'Duplicate days are not allowed inside the schedule array' }
    ),
});

/**
 * Client input payload type for overwriting the entire weekly schedule grid.
 */
export type UpdateAvailabilityInput = z.infer<typeof UpdateAvailabilitySchema>;