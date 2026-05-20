import { z } from 'zod';
import { UserSchema } from '../../generated/zod/index.js';

/**
 * Safe client-side user representation.
 * Explicitly omits highly sensitive credentials like password hashes.
 */
export const SafeUserSchema = UserSchema.omit({ 
  passwordHash: true 
});

/**
 * Inferred type for a secure, non-sensitive user profile instance.
 */
export type SafeUser = z.infer<typeof SafeUserSchema>;

/**
 * Standard server response payload issued upon a successful authentication event.
 * Delivers the network transit access token alongside safe profile data.
 */
export interface AuthResponseDTO {
  token: string;
  user: SafeUser;
}