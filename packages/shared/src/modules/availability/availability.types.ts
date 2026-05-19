/**
 * DTO for a single working day's configuration.
 */
export interface DayAvailabilityDTO {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 5 = Friday
  startHour: number;
  endHour: number; 
}

/**
 * Server response format for the GET endpoint.
 * Returns an array of configured days.
 */
export type AvailabilityResponseDTO = DayAvailabilityDTO[];