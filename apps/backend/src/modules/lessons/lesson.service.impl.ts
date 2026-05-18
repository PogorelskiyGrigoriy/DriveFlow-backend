import { ILessonService } from './lesson.service.js';
import { prisma } from '../../infrastructure/db.js';
import { CreateLessonInput, LessonResponseDTO } from '@driveflow/shared';
import { LessonStatus } from '@prisma/client';
import { ValidationError, ConflictError } from '../../utils/app-errors.js';

export class LessonServiceImpl implements ILessonService {
  async createLesson(input: CreateLessonInput): Promise<LessonResponseDTO> {
    const { instructorId, studentId, startTime } = input;

    // startTime is already a native JS Date object thanks to zod-prisma coercion
    const dayOfWeek = startTime.getUTCDay();
    const lessonHour = startTime.getUTCHours();

    // 1. Verify Instructor's general working availability for this specific day of week
    const availability = await prisma.instructorAvailability.findFirst({
      where: {
        instructorId,
        dayOfWeek,
      },
    });

    if (!availability) {
      throw new ValidationError('The instructor does not have a working schedule configured for this day.');
    }

    // 2. Validate boundaries (e.g., if startHour is 8 and endHour is 17, last allowed lesson starts at 16)
    if (lessonHour < availability.startHour || lessonHour >= availability.endHour) {
      throw new ValidationError(
        `Requested hour ${lessonHour}:00 is outside the instructor's working shift (${availability.startHour}:00 - ${availability.endHour}:00).`
      );
    }

    // 3. Check for existing booking conflicts at this exact time for this instructor
    const existingLesson = await prisma.lesson.findUnique({
      where: {
        instructorId_startTime: {
          instructorId,
          startTime,
        },
      },
    });

    let savedLesson;

    if (existingLesson) {
      // If there is an active lesson, block the request
      if (existingLesson.status === LessonStatus.SCHEDULED) {
        throw new ConflictError('This specific timeslot has already been booked by another student.');
      }

      // Smart Reuse: If the lesson was CANCELLED, we override and recycle the database record
      savedLesson = await prisma.lesson.update({
        where: { id: existingLesson.id },
        data: {
          studentId,
          status: LessonStatus.SCHEDULED,
        },
      });
    } else {
      // Perfect happy path: No record exists, create a brand new one
      savedLesson = await prisma.lesson.create({
        data: {
          instructorId,
          studentId,
          startTime,
          status: LessonStatus.SCHEDULED,
        },
      });
    }

    // 4. Transform native database Date tokens into unified transport ISO strings for DTO
    return {
      id: savedLesson.id,
      instructorId: savedLesson.instructorId,
      studentId: savedLesson.studentId,
      startTime: savedLesson.startTime.toISOString(),
      durationMin: savedLesson.durationMin,
      status: savedLesson.status,
      createdAt: savedLesson.createdAt.toISOString(),
    };
  }
}