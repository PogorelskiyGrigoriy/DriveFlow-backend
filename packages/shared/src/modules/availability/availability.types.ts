/**
 * Standard server response transfer object detailing a single working day configuration.
 */
export interface DayAvailabilityResponseDTO {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startHour: number;
  endHour: number; 
}

/**
 * Consolidated server response payload layout containing the full weekly configuration array.
 */
export type AvailabilityResponseDTO = DayAvailabilityResponseDTO[];