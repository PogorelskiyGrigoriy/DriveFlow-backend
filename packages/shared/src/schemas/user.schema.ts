import { z } from 'zod';
import { UserSchema } from '../generated/zod/index.js';
import { NAME_REGEX, ISRAEL_PHONE_REGEX } from '../utils/validation-regex.js';

/**
 * Enhanced User Profile Schema with Israeli market specifics.
 * Used for both validation in Backend and Telegram Bot.
 */
export const UserProfileSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  passwordHash: true,
}).extend({
  firstName: z.string()
    .trim()
    .min(2, 'Name too short')
    .max(50, 'Name too long')
    .regex(NAME_REGEX, 'Invalid characters in name')
    .transform(val => val.replace(/\s+/g, ' ')),
    
  lastName: z.string()
    .trim()
    .min(2, 'Last name too short')
    .max(50, 'Last name too long')
    .regex(NAME_REGEX, 'Invalid characters in last name')
    .transform(val => val.replace(/\s+/g, ' ')),

  phoneNumber: z.string()
    .transform(val => val.replace(/[- ]/g, ''))
    .refine(val => ISRAEL_PHONE_REGEX.test(val), { message: 'Invalid Israel phone format' })
    .transform(val => val.startsWith('0') ? '+972' + val.slice(1) : val),

  email: z.string()
    .email('Invalid email format')
    .trim()
    .lowercase()
    .nullish() 
    .or(z.literal('')),
});