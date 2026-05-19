import { ISlotService } from './slot.service.js';
import { prisma } from '../../infrastructure/db.js';
import { AvailableSlotsResponseDTO, DATE_YYYY_MM_DD_REGEX } from '@driveflow/shared';
import { LessonStatus } from '@prisma/client';
import { ValidationError } from '../../utils/app-errors.js';

export class SlotServiceImpl implements ISlotService {
  /**
   * Calculates all free 1-hour driving lesson slots for a specific instructor and date.
   */
  async getAvailableSlots(instructorId: string, date: string): Promise<AvailableSlotsResponseDTO> {
    if (!DATE_YYYY_MM_DD_REGEX.test(date)) {
      throw new ValidationError('Invalid date format. Expected YYYY-MM-DD.');
    }

    // 1. Parse date string (YYYY-MM-DD) safely using UTC to avoid timezone shifting bugs
    const [year, month, day] = date.split('-').map(Number);
    const targetDate = new Date(Date.UTC(year, month - 1, day));
    
    // JS .getUTCDay() returns: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const dayOfWeek = targetDate.getUTCDay();

    // 2. Fetch the instructor's working hours configuration for this specific day of the week
    const availability = await prisma.instructorAvailability.findFirst({
      where: {
        instructorId,
        dayOfWeek,
      },
    });

    // If the instructor does not work on this day (no record in DB), return empty slots
    if (!availability) {
      return { date, instructorId, slots: [] };
    }

    // 3. Define the time boundaries for the query to capture all lessons on this calendar day
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    // 4. Fetch all active scheduled lessons for this instructor on the target date
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

    // Extract already booked starting hours
    const bookedHours = bookedLessons.map((lesson) => lesson.startTime.getUTCHours());

    // 5. Generate free slots directly from the hours array stored in the database
    const availableSlots: string[] = [];

    // Setup logic to prevent booking in the past for TODAY
    const now = new Date();
    const isToday = 
      now.getUTCFullYear() === year && 
      now.getUTCMonth() === month - 1 && 
      now.getUTCDate() === day;
      
    const currentUTCHour = now.getUTCHours();

    for (const hour of availability.hours) {
      // Rule A: Skip if another student already booked this exact hour
      if (bookedHours.includes(hour)) continue;

      // Rule B: Skip if the date is today and the hour has already started or passed
      if (isToday && hour <= currentUTCHour) continue;

      // Format integer hour to standard readable string "HH:00" (e.g., "09:00")
      const formattedSlot = `${String(hour).padStart(2, '0')}:00`;
      availableSlots.push(formattedSlot);
    }

    // 6. Return unified payload following the shared DTO design contract
    return {
      date,
      instructorId,
      slots: availableSlots,
    };
  }
}