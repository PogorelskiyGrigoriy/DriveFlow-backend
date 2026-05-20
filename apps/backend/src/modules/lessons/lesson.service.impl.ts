import { ILessonService } from './lesson.service.js';
import { prisma } from '../../infrastructure/db.js';
import { CreateLessonInput, LessonResponseDTO, UpdateLessonStatusInput, DATE_YYYY_MM_DD_REGEX } from '@driveflow/shared';
import { LessonStatus, Role, Lesson } from '@prisma/client';
import { ValidationError, ConflictError, NotFoundError, ForbiddenError } from '../../utils/app-errors.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const ISRAEL_TZ = 'Asia/Jerusalem';

export class LessonServiceImpl implements ILessonService {
  
  async createLesson(input: CreateLessonInput & { studentId: string }): Promise<LessonResponseDTO> {
    const { instructorId, studentId, startTime } = input;

    const localTime = dayjs(startTime).tz(ISRAEL_TZ);
    const dayOfWeek = localTime.day();
    const lessonHour = localTime.hour();

    const availability = await prisma.instructorAvailability.findFirst({
      where: { instructorId, dayOfWeek },
    });

    if (!availability) {
      throw new ValidationError('The instructor does not have a working schedule configured for this day.');
    }

    if (!availability.hours.includes(lessonHour)) {
      throw new ValidationError(
        `Requested hour ${String(lessonHour).padStart(2, '0')}:00 is not within the instructor's scheduled working hours for this day.`
      );
    }

    const existingLesson = await prisma.lesson.findUnique({
      where: { instructorId_startTime: { instructorId, startTime } },
    });

    let savedLesson: Lesson;

    if (existingLesson) {
      if (existingLesson.status === LessonStatus.SCHEDULED) {
        throw new ConflictError('This specific timeslot has already been booked by another student.');
      }
      // Smart Recycling
      savedLesson = await this.recycleCancelledLesson(existingLesson.id, studentId);
    } else {
      savedLesson = await prisma.lesson.create({
        data: { instructorId, studentId, startTime, status: LessonStatus.SCHEDULED },
      });
    }

    return this.mapToResponseDTO(savedLesson);
  }

  async updateLessonStatus(
    lessonId: string,
    input: UpdateLessonStatusInput,
    userId: string,
    userRole: Role
  ): Promise<LessonResponseDTO> {
    const { status: targetStatus } = input;

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });

    if (!lesson) throw new NotFoundError('Lesson');
    if (lesson.status !== LessonStatus.SCHEDULED) {
      throw new ValidationError(`Cannot change status. This lesson is already ${lesson.status.toLowerCase()}.`);
    }

    if (userRole === Role.STUDENT && lesson.studentId !== userId) {
      throw new ForbiddenError('You can only manage your own driving lessons.');
    }
    if (userRole === Role.INSTRUCTOR && lesson.instructorId !== userId) {
      throw new ForbiddenError('You can only manage lessons assigned to you.');
    }

    if (targetStatus === LessonStatus.CANCELLED && userRole === Role.STUDENT) {
      const now = dayjs();
      const lessonTime = dayjs(lesson.startTime);
      const hoursToLesson = lessonTime.diff(now, 'hour', true);

      if (hoursToLesson < 24) {
        throw new ValidationError('Less than 24 hours remain until the lesson. Please contact your instructor to cancel or reschedule.');
      }
    }

    if (targetStatus === LessonStatus.COMPLETED && userRole === Role.STUDENT) {
      throw new ForbiddenError('Only instructors are authorized to mark lessons as completed.');
    }

    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: { status: targetStatus },
    });

    return this.mapToResponseDTO(updatedLesson);
  }

  async getUserLessons(userId: string): Promise<LessonResponseDTO[]> {
    const lessons = await prisma.lesson.findMany({
      where: { studentId: userId },
      orderBy: { startTime: 'asc' }, 
    });
    return lessons.map(lesson => this.mapToResponseDTO(lesson));
  }

  async getInstructorSchedule(instructorId: string, dateStr: string): Promise<LessonResponseDTO[]> {
    if (!DATE_YYYY_MM_DD_REGEX.test(dateStr)) {
      throw new ValidationError('Invalid date format. Expected YYYY-MM-DD.');
    }

    const startOfDay = dayjs.tz(`${dateStr}T00:00:00`, ISRAEL_TZ).toDate();
    const endOfDay = dayjs.tz(`${dateStr}T23:59:59.999`, ISRAEL_TZ).toDate();

    const lessons = await prisma.lesson.findMany({
      where: {
        instructorId,
        startTime: { gte: startOfDay, lte: endOfDay },
      },
      orderBy: { startTime: 'asc' }, 
    });

    return lessons.map(lesson => this.mapToResponseDTO(lesson));
  }

  private async recycleCancelledLesson(lessonId: string, studentId: string): Promise<Lesson> {
    return await prisma.lesson.update({
      where: { id: lessonId },
      data: { studentId, status: LessonStatus.SCHEDULED },
    });
  }

  private mapToResponseDTO(lesson: Lesson): LessonResponseDTO {
    return {
      id: lesson.id,
      instructorId: lesson.instructorId,
      studentId: lesson.studentId,
      startTime: lesson.startTime.toISOString(),
      durationMin: lesson.durationMin,
      status: lesson.status,
      createdAt: lesson.createdAt.toISOString(),
    };
  }
}