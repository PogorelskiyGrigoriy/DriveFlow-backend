import { LessonStatus } from '@prisma/client';

/**
 * Unified server response payload following successful driving lesson operations.
 * Optimized for network transit formats (dates enforced as strings).
 */
export interface LessonResponseDTO {
  id: string;
  instructorId: string;
  studentId: string;
  startTime: string; 
  durationMin: number;
  /**
   * Status linked strictly to Prisma generated enum to avoid hardcoded duplication.
   */
  status: LessonStatus;
  createdAt: string; 
}