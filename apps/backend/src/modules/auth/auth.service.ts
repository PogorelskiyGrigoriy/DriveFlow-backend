import { AuthResponseDTO } from '@driveflow/shared';

export interface IAuthService {
  // Login for instructors (Password)
  loginInstructor(phoneNumber: string, passwordRaw: string): Promise<AuthResponseDTO>;
  
  // Request Magic Link for students (SMS simulation)
  requestMagicLink(phoneNumber: string): Promise<void>;
  
  // Verify Magic Link when clicked from URL
  verifyMagicLink(token: string): Promise<AuthResponseDTO>;
}