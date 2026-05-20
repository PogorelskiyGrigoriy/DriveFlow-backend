/**
 * Pure network DTO for a basic student record.
 * Dates are strictly typed as ISO strings for safe JSON serialization.
 */
export interface BaseStudentDTO {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null; // Nullable to safely support archived/deleted students
  createdAt: string; 
}

/**
 * Specialized data component outlining essential dashboard statistics.
 */
export interface StudentStatsDTO {
  totalLessons: number;
  nextLessonAt: string | null; // Safe ISO string alignment
  hasActiveBooking: boolean;
}

/**
 * Extended Student DTO merging database records with active dashboard lifecycle analytics.
 */
export interface StudentWithStatsDTO extends BaseStudentDTO {
  stats: StudentStatsDTO;
}

/**
 * Response array containing all active students assigned to the logged-in instructor.
 */
export type InstructorStudentsResponseDTO = StudentWithStatsDTO[];

/**
 * Single student mutation action response wrapper.
 */
export interface StudentMutationResponseDTO {
  message: string;
  student: BaseStudentDTO;
}