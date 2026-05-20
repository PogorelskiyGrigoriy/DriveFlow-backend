import { Request, Response } from 'express';
import { ISlotService } from './slot.service.js';
import { GetAvailableSlotsQuerySchema } from '@driveflow/shared';

export class SlotController {
  constructor(private slotService: ISlotService) {}

  /**
   * HTTP Handler to fetch available driving slots for an instructor.
   */
  getAvailableSlots = async (req: Request, res: Response): Promise<void> => {
    const validatedQuery = GetAvailableSlotsQuerySchema.parse(req.query);
    
    const result = await this.slotService.getAvailableSlots(
      validatedQuery.instructorId,
      validatedQuery.date
    );
    
    res.status(200).json(result);
  };
}