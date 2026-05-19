import { AvailabilityResponseDTO, UpdateAvailabilityInput } from '@driveflow/shared';

/**
 * Interface definition for Instructor Availability Management.
 * Handles schedule updates, flat-to-array transformations, and student notifications.
 */
export interface IAvailabilityService {
  /**
   * Retrieves the current weekly schedule for a specific instructor.
   * Transforms the database's hours array back into flat start/end ranges for the frontend UI.
   * * @param instructorId - Unique UUID of the logged-in instructor
   * @returns A promise resolving to an array of configured days
   */
  getInstructorAvailability(instructorId: string): Promise<AvailabilityResponseDTO>;

  /**
   * Replaces the entire weekly schedule for an instructor.
   * Uses a database transaction to wipe old availability and insert the new grid,
   * converting the UI's flat start/end ranges into discrete hour arrays [8, 9, 10, ...].
   * * @param instructorId - Unique UUID of the logged-in instructor
   * @param input - Validated array of days with startHour and endHour
   * @returns A promise resolving to the newly saved schedule
   */
  updateAvailability(
    instructorId: string,
    input: UpdateAvailabilityInput
  ): Promise<AvailabilityResponseDTO>;

  /**
   * "The Magic Button" action.
   * Fetches all students assigned to this instructor, generates a fresh Magic Token 
   * for each, and dispatches a broadcast notification (console log for MVP).
   * * @param instructorId - Unique UUID of the logged-in instructor
   * @returns A promise resolving to a summary object containing the notification count
   */
  publishAvailability(instructorId: string): Promise<{ notifiedStudentsCount: number }>;
}