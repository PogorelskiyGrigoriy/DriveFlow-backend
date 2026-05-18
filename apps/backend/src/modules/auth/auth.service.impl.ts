import { IAuthService } from './auth.service.js';
import { prisma } from '../../infrastructure/db.js';
import { compare } from 'bcrypt-ts';
import jwt from 'jsonwebtoken';
import logger from '../../utils/pino-logger.js';
import { Role } from '@prisma/client';
import { AuthResponseDTO, SharedUser } from '@driveflow/shared';

export class AuthServiceImpl implements IAuthService {
  private jwtSecret = process.env.JWT_SECRET || 'super-secret-key';

  async loginInstructor(phoneNumber: string, passwordRaw: string): Promise<AuthResponseDTO> {
    const user = await prisma.user.findUnique({ where: { phoneNumber } });

    if (!user || user.role !== Role.INSTRUCTOR) {
      throw new Error('Invalid phone number or insufficient permissions');
    }

    if (!user.passwordHash) {
      throw new Error('Password is not set for this instructor account');
    }

    const isPasswordValid = await compare(passwordRaw, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, this.jwtSecret, { expiresIn: '30d' });
    
    // Explicitly cast to SharedUser to guarantee safety (hiding passwordHash)
    const safeUser: SharedUser = {
      id: user.id,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt,
      instructorId: user.instructorId
    };

    return { token, user: safeUser };
  }

  async requestMagicLink(phoneNumber: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { phoneNumber } });
    if (!user || user.role !== Role.STUDENT) {
      throw new Error('Student with this phone number was not found');
    }

    // Link expiration time — 15 minutes
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const magicRecord = await prisma.magicToken.create({
      data: {
        userId: user.id,
        expiresAt,
      },
    });

    // SMS Simulation for MVP (printed to backend console logs)
    const webAppUrl = process.env.WEB_APP_URL || 'http://localhost:3000';
    const magicLink = `${webAppUrl}/auth/verify?token=${magicRecord.token}`;
    logger.info(`[SMS MOCK] Sent to ${phoneNumber}: "Shalom! Access your DriveFlow schedule here: ${magicLink}"`);
  }

  async verifyMagicLink(token: string): Promise<AuthResponseDTO> {
    const magicRecord = await prisma.magicToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!magicRecord) {
      throw new Error('Invalid or already used security token');
    }

    if (new Date() > magicRecord.expiresAt) {
      await prisma.magicToken.delete({ where: { id: magicRecord.id } });
      throw new Error('The login link has expired');
    }

    const sessionToken = jwt.sign(
      { id: magicRecord.user.id, role: magicRecord.user.role },
      this.jwtSecret,
      { expiresIn: '30d' }
    );

    // Delete token immediately after use for security reasons
    await prisma.magicToken.delete({ where: { id: magicRecord.id } });

    const safeUser: SharedUser = {
      id: magicRecord.user.id,
      phoneNumber: magicRecord.user.phoneNumber,
      firstName: magicRecord.user.firstName,
      lastName: magicRecord.user.lastName,
      role: magicRecord.user.role,
      createdAt: magicRecord.user.createdAt,
      instructorId: magicRecord.user.instructorId
    };

    return { token: sessionToken, user: safeUser };
  }
}