import { ISlotService } from './slot.service.js';
import { prisma } from '../../infrastructure/db.js';
import { AvailableSlotsResponseDTO, DATE_YYYY_MM_DD_REGEX } from '@driveflow/shared';
import { LessonStatus } from '@prisma/client';
import { ValidationError } from '../../utils/app-errors.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const ISRAEL_TZ = 'Asia/Jerusalem';

export class SlotServiceImpl implements ISlotService {
  
  async getAvailableSlots(instructorId: string, date: string): Promise<AvailableSlotsResponseDTO> {
    if (!DATE_YYYY_MM_DD_REGEX.test(date)) {
      throw new ValidationError('Invalid date format. Expected YYYY-MM-DD.');
    }

    // 1. Create a dayjs object specifically in the Israel timezone
    const targetDate = dayjs.tz(date, ISRAEL_TZ);
    const dayOfWeek = targetDate.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // 2. Fetch the instructor's working hours configuration
    const availability = await prisma.instructorAvailability.findFirst({
      where: {
        instructorId,
        dayOfWeek,
      },
    });

    if (!availability || !availability.hours || availability.hours.length === 0) {
      return { date, instructorId, slots: [] };
    }

    // 3. Define timezone-aware time boundaries for the query
    const startOfDay = targetDate.startOf('day').toDate();
    const endOfDay = targetDate.endOf('day').toDate();

    // 4. Fetch all active scheduled lessons
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
        startTime: true, 
      },
    });

    // Extract already booked hours in the local timezone
    const bookedHours = bookedLessons.map((lesson) => dayjs(lesson.startTime).tz(ISRAEL_TZ).hour());

    const availableSlots: string[] = [];

    // 5. Time travel protection using local time
    const nowLocal = dayjs().tz(ISRAEL_TZ);
    const isToday = nowLocal.format('YYYY-MM-DD') === date;
    const currentLocalHour = nowLocal.hour();

    for (const hour of availability.hours) {
      // Rule A: Skip if booked
      if (bookedHours.includes(hour)) continue;

      // Rule B: Skip if the hour has already passed today
      if (isToday && hour <= currentLocalHour) continue;

      // Format integer hour to standard readable string "HH:00"
      const formattedSlot = `${String(hour).padStart(2, '0')}:00`;
      availableSlots.push(formattedSlot);
    }

    return {
      date,
      instructorId,
      slots: availableSlots,
    };
  }
}