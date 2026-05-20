import { Request, Response } from 'express';
import { IAvailabilityService } from './availability.service.js';
import { UpdateAvailabilitySchema } from '@driveflow/shared';

export class AvailabilityController {
  constructor(private availabilityService: IAvailabilityService) {}

  /**
   * GET /api/instructor/availability
   */
  getAvailability = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user.id; 

    const result = await this.availabilityService.getInstructorAvailability(instructorId);
    res.status(200).json(result);
  };

  /**
   * PUT /api/instructor/availability
   */
  updateAvailability = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user.id;

    const validatedInput = UpdateAvailabilitySchema.parse(req.body);
    const result = await this.availabilityService.updateAvailability(instructorId, validatedInput);

    res.status(200).json(result);
  };

  /**
   * POST /api/instructor/availability/publish
   */
  publishAvailability = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user.id;

    const result = await this.availabilityService.publishAvailability(instructorId);
    res.status(200).json(result);
  };
}