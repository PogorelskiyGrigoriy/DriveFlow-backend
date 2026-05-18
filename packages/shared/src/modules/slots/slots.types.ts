/**
 * Unified server response containing available time slots for booking
 */
export interface AvailableSlotsResponseDTO {
  date: string; // YYYY-MM-DD
  instructorId: string;
  slots: string[]; // e.g., ["08:00", "09:00", "11:00", "15:00"]
}