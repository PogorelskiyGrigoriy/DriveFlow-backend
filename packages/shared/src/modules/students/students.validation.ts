import { z } from 'zod';
import { NAME_REGEX, ISRAEL_PHONE_REGEX } from '../../utils/validation-regex.js';

/**
 * Schema for creating a new student via Instructor Dashboard modal.
 * Uses shared multi-language name regex and Israeli phone format.
 */
export const CreateStudentSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must contain at least 2 characters')
    .max(50, 'First name is too long')
    .regex(NAME_REGEX, 'First name contains invalid characters (supports English, Hebrew, Russian, Arabic)'),
  lastName: z
    .string()
    .min(2, 'Last name must contain at least 2 characters')
    .max(50, 'Last name is too long')
    .regex(NAME_REGEX, 'Last name contains invalid characters (supports English, Hebrew, Russian, Arabic)'),
  phoneNumber: z
    .string()
    .regex(ISRAEL_PHONE_REGEX, 'Invalid Israeli mobile phone number format'),
});

/**
 * Schema for updating an existing student.
 */
export const UpdateStudentSchema = CreateStudentSchema;

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>;
export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>;