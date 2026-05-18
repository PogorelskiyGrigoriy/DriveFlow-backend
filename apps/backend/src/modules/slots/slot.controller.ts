import { Request, Response } from 'express';
import { ISlotService } from './slot.service.js';
import { getAvailableSlotsQuerySchema } from '@driveflow/shared';

export class SlotController {
  constructor(private slotService: ISlotService) {}

  /**
   * HTTP Handler to fetch available driving slots for an instructor on a chosen date.
   * Query params are parsed and validated strictly against the shared Zod schema.
   */
  getAvailableSlots = async (req: Request, res: Response): Promise<void> => {
    // 1. End-to-end validation of query parameters (?instructorId=UUID&date=YYYY-MM-DD)
    const validatedQuery = getAvailableSlotsQuerySchema.parse(req.query);
    
    // 2. Delegate data processing to the isolated slot service layer
    const result = await this.slotService.getAvailableSlots(
      validatedQuery.instructorId,
      validatedQuery.date
    );
    
    // 3. Dispatch uniform 200 OK response back to the client
    res.status(200).json(result);
  };
}