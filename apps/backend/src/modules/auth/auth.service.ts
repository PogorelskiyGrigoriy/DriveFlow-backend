import { AuthResponseDTO } from '@driveflow/shared';

/**
 * Interface defining authentication and session management operations.
 */
export interface IAuthService {
  /** Authenticates an instructor via password and returns a JWT session. */
  loginInstructor(phoneNumber: string, passwordRaw: string): Promise<AuthResponseDTO>;
  
  /** Generates and dispatches a single-use magic login link via SMS. */
  requestMagicLink(phoneNumber: string): Promise<void>;
  
  /** Validates a magic token and returns a JWT session if valid. */
  verifyMagicLink(token: string): Promise<AuthResponseDTO>;
}