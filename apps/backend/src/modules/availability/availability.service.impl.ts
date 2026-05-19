import { IAvailabilityService } from './availability.service.js';
import { prisma } from '../../infrastructure/db.js';
import { AvailabilityResponseDTO, UpdateAvailabilityInput } from '@driveflow/shared';
import { Role } from '@prisma/client';
import logger from '../../utils/pino-logger.js';

export class AvailabilityServiceImpl implements IAvailabilityService {
  
  /**
   * Retrieves schedule from DB (arrays of hours) and maps them into ranges for the UI.
   */
  async getInstructorAvailability(instructorId: string): Promise<AvailabilityResponseDTO> {
    const availabilities = await prisma.instructorAvailability.findMany({
      where: { instructorId },
      orderBy: { dayOfWeek: 'asc' },
    });

    return availabilities.map((record) => {
      // Return empty ranges if no hours are configured
      if (!record.hours || record.hours.length === 0) {
        return { dayOfWeek: record.dayOfWeek, startHour: 0, endHour: 0 };
      }

      // Sort hours to determine range boundaries
      const sortedHours = [...record.hours].sort((a, b) => a - b);
      const startHour = sortedHours[0];
      // End hour is the last working hour + 1 (since a lesson lasts 1 hour)
      const endHour = sortedHours[sortedHours.length - 1] + 1;

      return {
        dayOfWeek: record.dayOfWeek,
        startHour,
        endHour,
      };
    });
  }

  /**
   * Updates schedule: wipes old records, expands ranges into hour arrays, and persists them.
   */
  async updateAvailability(
    instructorId: string,
    input: UpdateAvailabilityInput
  ): Promise<AvailabilityResponseDTO> {
    
    // Use transaction for atomicity: delete old and insert new in one go
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

  /**
   * Broadcasts availability update: finds students, generates tokens, and logs notifications.
   */
  async publishAvailability(instructorId: string): Promise<{ notifiedStudentsCount: number }> {
    const students = await prisma.user.findMany({
      where: {
        instructorId,
        role: Role.STUDENT,
      },
    });

    if (students.length === 0) {
      logger.info({ instructorId }, 'Publish availability triggered, but no students found.');
      return { notifiedStudentsCount: 0 };
    }

    let notifiedCount = 0;
    const expiresAt = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000); // 6 * 24h expiration

    logger.info({ instructorId, studentCount: students.length }, 'Starting availability broadcast to students');

    for (const student of students) {
      const magicToken = await prisma.magicToken.create({
        data: {
          userId: student.id,
          expiresAt,
        },
      });

      // Log notification using pino (structured logging)
      logger.info(
        {
          studentId: student.id,
          phoneNumber: student.phoneNumber,
          magicLink: `http://localhost:5173/verify?token=${magicToken.token}`,
        },
        `SMS/WhatsApp sent to ${student.firstName} ${student.lastName}`
      );
      
      notifiedCount++;
    }

    logger.info({ instructorId, notifiedCount }, 'Availability broadcast completed successfully');

    return { notifiedStudentsCount: notifiedCount };
  }
}