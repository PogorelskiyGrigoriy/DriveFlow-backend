import { AvailabilityResponseDTO, UpdateAvailabilityInput } from '@driveflow/shared';

/**
 * Interface for managing Instructor operational hours and notifications.
 */
export interface IAvailabilityService {
  /** Retrieves the weekly schedule mapped as flat time ranges (startHour to endHour). */
  getInstructorAvailability(instructorId: string): Promise<AvailabilityResponseDTO>;

  /** Replaces the entire weekly schedule, expanding ranges into discrete hour arrays in DB. */
  updateAvailability(instructorId: string, input: UpdateAvailabilityInput): Promise<AvailabilityResponseDTO>;

  /** Generates magic links and dispatches broadcast notifications to all assigned students. */
  publishAvailability(instructorId: string): Promise<{ notifiedStudentsCount: number }>;
}