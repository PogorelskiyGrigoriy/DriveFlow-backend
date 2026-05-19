import { CreateLessonInput, LessonResponseDTO, UpdateLessonStatusInput } from '@driveflow/shared';
import { Role } from '@prisma/client';

/**
 * Interface definition for Driving Lesson Management.
 * Handles booking orchestration, state changes, double-booking protection, and data retrieval.
 */
export interface ILessonService {
  /**
   * Books a new 1-hour driving lesson.
   * Validates instructor availability and ensures no time conflicts exist.
   * @param input - Validated lesson details containing instructor, student, and start time
   * @returns A promise resolving to the created lesson record DTO
   */
  createLesson(input: CreateLessonInput): Promise<LessonResponseDTO>;

  /**
   * Updates the operational status of an existing driving lesson.
   * Enforces business rules such as the 24-hour cancellation lock for students.
   * @param lessonId - Unique identifier (UUID) of the target lesson
   * @param input - Validated status payload (SCHEDULED, COMPLETED, CANCELLED)
   * @param userId - ID of the user requesting the change (extracted from JWT)
   * @param userRole - Role of the user requesting the change (STUDENT or INSTRUCTOR)
   * @returns A promise resolving to the updated lesson record DTO
   */
  updateLessonStatus(
    lessonId: string,
    input: UpdateLessonStatusInput,
    userId: string,
    userRole: Role
  ): Promise<LessonResponseDTO>;

  /**
   * Retrieves all lessons for a specific student, ordered chronologically.
   * Used for the student's dashboard (upcoming lesson widget & history archive).
   * @param userId - ID of the student requesting their lessons
   * @returns A promise resolving to an array of lesson DTOs
   */
  getUserLessons(userId: string): Promise<LessonResponseDTO[]>;

  /**
   * Retrieves all lessons for an instructor on a specific calendar day.
   * Used for the instructor's daily schedule view.
   * @param instructorId - ID of the instructor
   * @param dateStr - Target date string in YYYY-MM-DD format
   * @returns A promise resolving to an array of lesson DTOs ordered by start time
   */
  getInstructorSchedule(instructorId: string, dateStr: string): Promise<LessonResponseDTO[]>;
}