/**
 * Unified server response after successfully booking a lesson
 */
export interface LessonResponseDTO {
  id: string;
  instructorId: string;
  studentId: string;
  startTime: string; // ISO 8601 string
  durationMin: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string; // ISO 8601 string
}