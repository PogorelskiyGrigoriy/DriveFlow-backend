import { User } from '@prisma/client';

export interface AuthResponse {
  token: string;
  user: Omit<User, 'passwordHash'>;
}

export interface IAuthService {
  // Логин для учителя (Пароль)
  loginInstructor(phoneNumber: string, passwordRaw: string): Promise<AuthResponse>;
  
  // Запрос Magic Link для ученика (SMS)
  requestMagicLink(phoneNumber: string): Promise<void>;
  
  // Верификация Magic Link при клике
  verifyMagicLink(token: string): Promise<AuthResponse>;
}