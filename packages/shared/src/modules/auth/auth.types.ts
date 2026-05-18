import { z } from 'zod';
import { UserSchema } from '../../generated/zod/index.js';

/**
 * Safe user type for the frontend (excluding sensitive data like passwordHash)
 */
export const sharedUserSchema = UserSchema.omit({ 
  passwordHash: true 
});

export type SharedUser = z.infer<typeof sharedUserSchema>;

/**
 * Unified server response upon successful authentication (JWT + Safe User)
 */
export interface AuthResponseDTO {
  token: string;
  user: SharedUser;
}