import { Request, Response } from 'express';
import { IAvailabilityService } from './availability.service.js';
import { UpdateAvailabilitySchema } from '@driveflow/shared';

export class AvailabilityController {
  constructor(private availabilityService: IAvailabilityService) {}

  /**
   * Retrieves the current schedule for the authenticated instructor.
   */
  getAvailability = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id; 
    const result = await this.availabilityService.getInstructorAvailability(instructorId);
    res.status(200).json(result);
  };

  /**
   * Overwrites the schedule using the validated array payload.
   */
  updateAvailability = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id;
    const validatedInput = UpdateAvailabilitySchema.parse(req.body);
    const result = await this.availabilityService.updateAvailability(instructorId, validatedInput);
    res.status(200).json(result);
  };

  /**
   * Triggers the magic link dispatch to all assigned students.
   */
  publishAvailability = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user!.id;
    const result = await this.availabilityService.publishAvailability(instructorId);
    res.status(200).json(result);
  };
}