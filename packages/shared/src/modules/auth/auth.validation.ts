import { z } from 'zod';
import { ISRAEL_PHONE_REGEX } from '../../utils/validation-regex.js';

/**
 * Validation schema for instructor authentication via password.
 */
export const LoginInstructorSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .regex(ISRAEL_PHONE_REGEX, 'Invalid Israeli phone number format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
});

/**
 * Validation schema for student magic link request generation.
 */
export const RequestMagicLinkSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .regex(ISRAEL_PHONE_REGEX, 'Invalid Israeli phone number format'),
});

/**
 * Validation schema for verifying the security token from a magic link.
 */
export const VerifyMagicLinkSchema = z.object({
  token: z
    .uuid('Invalid security token format'),
});

export type LoginInstructorInput = z.infer<typeof LoginInstructorSchema>;
export type RequestMagicLinkInput = z.infer<typeof RequestMagicLinkSchema>;
export type VerifyMagicLinkInput = z.infer<typeof VerifyMagicLinkSchema>;