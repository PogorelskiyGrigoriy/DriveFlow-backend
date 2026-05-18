import { ISlotService } from './slot.service.js';
import { prisma } from '../../infrastructure/db.js';
import { AvailableSlotsResponseDTO } from '@driveflow/shared';
import { LessonStatus } from '@prisma/client';

export class SlotServiceImpl implements ISlotService {
  /**
   * Calculates all free 1-hour driving lesson slots for a specific instructor and date.
   */
  async getAvailableSlots(instructorId: string, date: string): Promise<AvailableSlotsResponseDTO> {
    // 1. Parse date string (YYYY-MM-DD) safely using UTC to avoid timezone shifting bugs
    const [year, month, day] = date.split('-').map(Number);
    const targetDate = new Date(Date.UTC(year, month - 1, day));
    
    // JS .getUTCDay() returns: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // Matches the standard Israeli working week pattern
    const dayOfWeek = targetDate.getUTCDay();

    // 2. Fetch the instructor's working hours configuration for this specific day of the week
    // Fixed: Removed 'isWorkingDay' property. If record exists, it is a working day.
    const availability = await prisma.instructorAvailability.findFirst({
      where: {
        instructorId,
        dayOfWeek,
      },
    });

    // If the instructor does not work on this day (no record in DB), return empty slots
    if (!availability) {
      return {
        date,
        instructorId,
        slots: [],
      };
    }

    // 3. Define the time boundaries for the query to capture all lessons on this calendar day
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    // 4. Fetch all active scheduled lessons for this instructor on the target date
    // Fixed: Changed field name from 'date' to 'startTime' to match schema.prisma
    const bookedLessons = await prisma.lesson.findMany({
      where: {
        instructorId,
        status: LessonStatus.SCHEDULED,
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        startTime: true, // Pull only timestamps from the database
      },
    });

    // Extract already booked starting hours using the correct 'startTime' field
    const bookedHours = bookedLessons.map((lesson) => lesson.startTime.getUTCHours());

    // 5. Generate full working hours grid and filter out booked slots
    const availableSlots: string[] = [];
    const startHour = availability.startHour; // e.g., 8
    const endHour = availability.endHour;     // e.g., 17

    for (let hour = startHour; hour < endHour; hour++) {
      // If the hour is not in the booked array, it's open for registration
      if (!bookedHours.includes(hour)) {
        // Format integer hour to standard readable string "HH:00" (e.g., "09:00")
        const formattedSlot = `${String(hour).padStart(2, '0')}:00`;
        availableSlots.push(formattedSlot);
      }
    }

    // 6. Return unified payload following the shared DTO design contract
    return {
      date,
      instructorId,
      slots: availableSlots,
    };
  }
}