import { IAvailabilityService } from './availability.service.js';
import { prisma } from '../../infrastructure/db.js';
import { AvailabilityResponseDTO, UpdateAvailabilityInput } from '@driveflow/shared';
import { Role } from '@prisma/client';
import logger from '../../utils/pino-logger.js';

export class AvailabilityServiceImpl implements IAvailabilityService {
  
  async getInstructorAvailability(instructorId: string): Promise<AvailabilityResponseDTO> {
    const availabilities = await prisma.instructorAvailability.findMany({
      where: { instructorId },
      orderBy: { dayOfWeek: 'asc' },
    });

    return availabilities.map((record) => {
      if (!record.hours || record.hours.length === 0) {
        return { dayOfWeek: record.dayOfWeek, startHour: 0, endHour: 0 };
      }

      const sortedHours = [...record.hours].sort((a, b) => a - b);
      return {
        dayOfWeek: record.dayOfWeek,
        startHour: sortedHours[0],
        endHour: sortedHours[sortedHours.length - 1] + 1,
      };
    });
  }

  async updateAvailability(
    instructorId: string,
    input: UpdateAvailabilityInput
  ): Promise<AvailabilityResponseDTO> {
    
    await prisma.$transaction(async (tx) => {
      await tx.instructorAvailability.deleteMany({
        where: { instructorId },
      });

      const recordsToCreate = input.schedule.map((day) => {
        const hoursArray: number[] = [];
        for (let hour = day.startHour; hour < day.endHour; hour++) {
          hoursArray.push(hour);
        }

        return {
          instructorId,
          dayOfWeek: day.dayOfWeek,
          hours: hoursArray,
        };
      });

      if (recordsToCreate.length > 0) {
        await tx.instructorAvailability.createMany({
          data: recordsToCreate,
        });
      }
    });

    return input.schedule;
  }

  async publishAvailability(instructorId: string): Promise<{ notifiedStudentsCount: number }> {
    const students = await prisma.user.findMany({
      where: { instructorId, role: Role.STUDENT, deletedAt: null },
    });

    if (students.length === 0) {
      logger.info({ instructorId }, 'Publish availability triggered, but no active students found.');
      return { notifiedStudentsCount: 0 };
    }

    const expiresAt = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000);
    const webAppUrl = process.env.WEB_APP_URL || 'http://localhost:5173';

    logger.info({ instructorId, studentCount: students.length }, 'Starting availability broadcast to students');

    // Оптимизация: Параллельное создание токенов вместо последовательного (Promise.all)
    const notificationPromises = students.map(async (student) => {
      const magicToken = await prisma.magicToken.create({
        data: { userId: student.id, expiresAt },
      });

      logger.info(
        {
          studentId: student.id,
          phoneNumber: student.phoneNumber ?? 'NO_PHONE', 
          magicLink: `${webAppUrl}/verify?token=${magicToken.token}`,
        },
        `SMS/WhatsApp sent to ${student.firstName} ${student.lastName}`
      );
    });

    await Promise.all(notificationPromises);

    logger.info({ instructorId, notifiedCount: students.length }, 'Availability broadcast completed successfully');

    return { notifiedStudentsCount: students.length };
  }
}