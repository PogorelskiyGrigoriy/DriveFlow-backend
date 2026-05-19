import { ILessonService } from './lesson.service.js';
import { prisma } from '../../infrastructure/db.js';
import { CreateLessonInput, LessonResponseDTO, UpdateLessonStatusInput, DATE_YYYY_MM_DD_REGEX } from '@driveflow/shared';
import { LessonStatus, Role, Lesson } from '@prisma/client';
import { ValidationError, ConflictError, NotFoundError, ForbiddenError } from '../../utils/app-errors.js';

export class LessonServiceImpl implements ILessonService {
  /**
   * Books a new driving lesson.
   * Orchestrates working hours validations and double-booking guards.
   */
  async createLesson(input: CreateLessonInput): Promise<LessonResponseDTO> {
    const { instructorId, studentId, startTime } = input;

    const dayOfWeek = startTime.getUTCDay();
    const lessonHour = startTime.getUTCHours();

    // 1. Verify Instructor's general working availability
    const availability = await prisma.instructorAvailability.findFirst({
      where: { instructorId, dayOfWeek },
    });

    if (!availability) {
      throw new ValidationError('The instructor does not have a working schedule configured for this day.');
    }

    // 2. Validate boundaries
    if (lessonHour < availability.startHour || lessonHour >= availability.endHour) {
      throw new ValidationError(
        `Requested hour ${lessonHour}:00 is outside the instructor's working shift (${availability.startHour}:00 - ${availability.endHour}:00).`
      );
    }

    // 3. Check for existing booking conflicts
    const existingLesson = await prisma.lesson.findUnique({
      where: {
        instructorId_startTime: { instructorId, startTime },
      },
    });

    let savedLesson: Lesson;

    if (existingLesson) {
      if (existingLesson.status === LessonStatus.SCHEDULED) {
        throw new ConflictError('This specific timeslot has already been booked by another student.');
      }

      // Explicitly delegation to our private DB mutator for Smart Recycling
      savedLesson = await this.recycleCancelledLesson(existingLesson.id, studentId);
    } else {
      // Perfect happy path: Create a fresh entry
      savedLesson = await prisma.lesson.create({
        data: {
          instructorId,
          studentId,
          startTime,
          status: LessonStatus.SCHEDULED,
        },
      });
    }

    return this.mapToResponseDTO(savedLesson);
  }

  /**
   * Updates an existing lesson's status with security checks and time policies
   */
  async updateLessonStatus(
    lessonId: string,
    input: UpdateLessonStatusInput,
    userId: string,
    userRole: Role
  ): Promise<LessonResponseDTO> {
    const { status: targetStatus } = input;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundError('Lesson');
    }

    if (lesson.status !== LessonStatus.SCHEDULED) {
      throw new ValidationError(`Cannot change status. This lesson is already ${lesson.status.toLowerCase()}.`);
    }

    // Access Control Guard
    if (userRole === Role.STUDENT && lesson.studentId !== userId) {
      throw new ForbiddenError('You can only manage your own driving lessons.');
    }
    if (userRole === Role.INSTRUCTOR && lesson.instructorId !== userId) {
      throw new ForbiddenError('You can only manage lessons assigned to you.');
    }

    // Role-Specific Business Rules
    if (targetStatus === LessonStatus.CANCELLED) {
      if (userRole === Role.STUDENT) {
        const now = new Date();
        const millisecondsToLesson = lesson.startTime.getTime() - now.getTime();
        const hoursToLesson = millisecondsToLesson / (1000 * 60 * 60);

        if (hoursToLesson < 24) {
          throw new ValidationError('Less than 24 hours remain until the lesson. Please contact your instructor to cancel or reschedule.');
        }
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

  /**
   * Retrieves all lessons for a specific student, ordered by upcoming first.
   */
  async getUserLessons(userId: string): Promise<LessonResponseDTO[]> {
    const lessons = await prisma.lesson.findMany({
      where: { studentId: userId },
      orderBy: { startTime: 'asc' }, 
    });

    return lessons.map(lesson => this.mapToResponseDTO(lesson));
  }

  /**
   * Retrieves all lessons for an instructor on a specific calendar day.
   * Expects dateStr in YYYY-MM-DD format.
   */
  async getInstructorSchedule(instructorId: string, dateStr: string): Promise<LessonResponseDTO[]> {
    if (!DATE_YYYY_MM_DD_REGEX.test(dateStr)) {
      throw new ValidationError('Invalid date format. Expected YYYY-MM-DD.');
    }

    const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
    const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);

    const lessons = await prisma.lesson.findMany({
      where: {
        instructorId,
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { startTime: 'asc' }, 
    });

    return lessons.map(lesson => this.mapToResponseDTO(lesson));
  }

  /**
   * Private DB Mutator to override and recycle an existing CANCELLED record.
   * Keeps database size small and prevents unique index constraints errors.
   */
  private async recycleCancelledLesson(lessonId: string, studentId: string): Promise<Lesson> {
    return await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        studentId,
        status: LessonStatus.SCHEDULED,
      },
    });
  }

  /**
   * Helper utility to format Prisma Lesson objects into transport-safe DTOs.
   * Fully type-safe and synchronous.
   */
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