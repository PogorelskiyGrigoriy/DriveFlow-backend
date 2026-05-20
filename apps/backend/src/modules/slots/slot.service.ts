import { AvailableSlotsResponseDTO } from '@driveflow/shared';

/**
 * Interface definition for Slot and Availability Engine.
 */
export interface ISlotService {
  /**
   * Calculates all free 1-hour driving lesson slots for a specific instructor and date.
   * Compares the instructor's general schedule against booked lessons.
   */
  getAvailableSlots(instructorId: string, date: string): Promise<AvailableSlotsResponseDTO>;
}