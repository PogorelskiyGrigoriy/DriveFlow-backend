import { z } from 'zod';
import { ISRAEL_PHONE_REGEX } from '../../utils/validation-regex.js';

/**
 * Validation for instructor login via password
 */
export const loginInstructorSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .regex(ISRAEL_PHONE_REGEX, 'Invalid Israeli phone number format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
});

/**
 * Validation for student magic link request
 */
export const requestMagicLinkSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .regex(ISRAEL_PHONE_REGEX, 'Invalid Israeli phone number format'),
});

/**
 * Validation for the token when clicking the verification link
 */
export const verifyMagicLinkSchema = z.object({
  token: z
    .uuid('Invalid security token format'),
});

export type LoginInstructorInput = z.infer<typeof loginInstructorSchema>;
export type RequestMagicLinkInput = z.infer<typeof requestMagicLinkSchema>;
export type VerifyMagicLinkInput = z.infer<typeof verifyMagicLinkSchema>;