import { LessonStatus } from '@prisma/client';

/**
 * Unified server response after successfully booking a lesson.
 * Tailored for network transit (JSON format).
 */
export interface LessonResponseDTO {
  id: string;
  instructorId: string;
  studentId: string;
  startTime: string; 
  durationMin: number;
  /**
   * Tied directly to Prisma generated enum to avoid hardcoded duplication
   */
  status: LessonStatus;
  createdAt: string; 
}