/**
 * Standard server response payload structure providing available booking windows for a target date.
 */
export interface AvailableSlotsResponseDTO {
  date: string; // Formatted strictly as YYYY-MM-DD
  instructorId: string;
  slots: string[]; // Array of short hour markers, e.g., ["08:00", "09:00", "11:00", "15:00"]
}