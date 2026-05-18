import { CreateLessonInput, LessonResponseDTO } from '@driveflow/shared';

/**
 * Interface definition for Driving Lesson Management.
 * Handles booking orchestration, state changes, and double-booking protection.
 */
export interface ILessonService {
  /**
   * Books a new 1-hour driving lesson.
   * Validates instructor availability and ensures no time conflicts exist.
   * * @param input - Validated lesson details containing instructor, student, and start time
   * @returns A promise resolving to the created lesson record DTO
   */
  createLesson(input: CreateLessonInput): Promise<LessonResponseDTO>;
}