import { CreateLessonInput, LessonResponseDTO, UpdateLessonStatusInput } from '@driveflow/shared';
import { Role } from '@prisma/client';

/**
 * Interface defining driving lesson orchestration and scheduling operations.
 */
export interface ILessonService {
  /** Books a new lesson, validating instructor availability and preventing double-booking. */
  createLesson(input: CreateLessonInput & { studentId: string }): Promise<LessonResponseDTO>;

  /** Updates lesson status, enforcing access control and cancellation policies. */
  updateLessonStatus(
    lessonId: string,
    input: UpdateLessonStatusInput,
    userId: string,
    userRole: Role
  ): Promise<LessonResponseDTO>;

  /** Retrieves chronologically ordered lesson history for a specific student. */
  getUserLessons(userId: string): Promise<LessonResponseDTO[]>;

  /** Retrieves an instructor's linear schedule for a specific date (YYYY-MM-DD). */
  getInstructorSchedule(instructorId: string, dateStr: string): Promise<LessonResponseDTO[]>;
}