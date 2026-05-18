import { AvailableSlotsResponseDTO } from '@driveflow/shared';

/**
 * Interface definition for Slot and Availability Engine.
 * Handles the calculation of bookable driving lesson timeslots.
 */
export interface ISlotService {
  /**
   * Calculates all free 1-hour driving lesson slots for a specific instructor and date.
   * Compares the instructor's general working schedule against already booked lessons.
   * * @param instructorId - Unique UUID of the driving instructor
   * @param date - Target date string in strict YYYY-MM-DD format
   * @returns A promise resolving to the unified DTO containing available slots array
   */
  getAvailableSlots(instructorId: string, date: string): Promise<AvailableSlotsResponseDTO>;
}