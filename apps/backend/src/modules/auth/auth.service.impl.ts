import { IAuthService } from './auth.service.js';
import { prisma } from '../../infrastructure/db.js';
import { compare } from 'bcrypt-ts';
import jwt from 'jsonwebtoken';
import logger from '../../utils/pino-logger.js';
import { Role } from '@prisma/client';
import { AuthResponseDTO, SafeUser } from '@driveflow/shared';
import { AppError, UnauthorizedError } from '../../utils/app-errors.js';

export class AuthServiceImpl implements IAuthService {
  private jwtSecret = process.env.JWT_SECRET || 'super-secret-key';

  async loginInstructor(phoneNumber: string, passwordRaw: string): Promise<AuthResponseDTO> {
    const user = await prisma.user.findUnique({ where: { phoneNumber } });

    // Ensure user exists, is an active instructor, and is not soft-deleted
    if (!user || user.role !== Role.INSTRUCTOR || user.deletedAt !== null) {
      throw new UnauthorizedError('Invalid phone number or insufficient permissions');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedError('Password is not set for this instructor account');
    }

    const isPasswordValid = await compare(passwordRaw, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, this.jwtSecret, { expiresIn: '30d' });
    
    return { token, user: this.mapToSafeUser(user) };
  }

  async requestMagicLink(phoneNumber: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { phoneNumber } });

    // Ensure user exists, is an active student, and is not soft-deleted
    if (!user || user.role !== Role.STUDENT || user.deletedAt !== null) {
      throw new AppError('Student with this phone number was not found', 404, 'NOT_FOUND');
    }

    // Set expiration to 15 minutes from now
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const magicRecord = await prisma.magicToken.create({
      data: {
        userId: user.id,
        expiresAt,
      },
    });

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
      throw new UnauthorizedError('Invalid or already used security token');
    }

    if (new Date() > magicRecord.expiresAt) {
      await prisma.magicToken.delete({ where: { id: magicRecord.id } });
      throw new UnauthorizedError('The login link has expired');
    }

    const sessionToken = jwt.sign(
      { id: magicRecord.user.id, role: magicRecord.user.role },
      this.jwtSecret,
      { expiresIn: '30d' }
    );

    // Clean up the used token
    await prisma.magicToken.delete({ where: { id: magicRecord.id } });

    return { token: sessionToken, user: this.mapToSafeUser(magicRecord.user) };
  }

  /**
   * Helper utility to format Prisma user objects into transport-safe SafeUser records.
   */
  private mapToSafeUser(user: any): SafeUser {
    return {
      id: user.id,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt,
      instructorId: user.instructorId,
      deletedAt: user.deletedAt
    };
  }
}