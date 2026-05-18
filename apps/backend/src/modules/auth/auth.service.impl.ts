import { IAuthService, AuthResponse } from './auth.service.js';
import { prisma } from '../../infrastructure/db.js';
import { compare } from 'bcrypt-ts';
import jwt from 'jsonwebtoken';
import logger from '../../utils/pino-logger.js';
import { Role } from '@prisma/client';

export class AuthServiceImpl implements IAuthService {
  private jwtSecret = process.env.JWT_SECRET || 'super-secret-key';

  async loginInstructor(phoneNumber: string, passwordRaw: string): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({ where: { phoneNumber } });

    if (!user || user.role !== Role.INSTRUCTOR) {
      throw new Error('Неверный номер телефона или недостаточно прав');
    }

    if (!user.passwordHash) {
      throw new Error('Для данного пользователя не задан пароль');
    }

    const isPasswordValid = await compare(passwordRaw, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Неверный пароль');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, this.jwtSecret, { expiresIn: '30d' });
    const { passwordHash, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }

  async requestMagicLink(phoneNumber: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { phoneNumber } });
    if (!user || user.role !== Role.STUDENT) {
      throw new Error('Ученик с таким номером телефона не найден');
    }

    // Срок действия ссылки — 15 минут
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const magicRecord = await prisma.magicToken.create({
      data: {
        userId: user.id,
        expiresAt,
      },
    });

    // Имитация отправки SMS для MVP (выводим в логи бэкенда)
    const magicLink = `${process.env.WEB_APP_URL || 'http://localhost:3000'}/auth/verify?token=${magicRecord.token}`;
    logger.info(`[SMS MOCK] На номер ${phoneNumber} отправлена ссылка: ${magicLink}`);
  }

  async verifyMagicLink(token: string): Promise<AuthResponse> {
    const magicRecord = await prisma.magicToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!magicRecord) {
      throw new Error('Недействительный или использованный токен');
    }

    if (new Date() > magicRecord.expiresAt) {
      await prisma.magicToken.delete({ where: { id: magicRecord.id } });
      throw new Error('Срок действия ссылки истек');
    }

    const sessionToken = jwt.sign(
      { id: magicRecord.user.id, role: magicRecord.user.role },
      this.jwtSecret,
      { expiresIn: '30d' }
    );

    // Удаляем использованный токен из соображений безопасности
    await prisma.magicToken.delete({ where: { id: magicRecord.id } });

    const { passwordHash, ...userWithoutPassword } = magicRecord.user;
    return { token: sessionToken, user: userWithoutPassword };
  }
}