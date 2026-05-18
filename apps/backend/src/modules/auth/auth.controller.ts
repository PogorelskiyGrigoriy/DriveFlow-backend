import { Request, Response } from 'express';
import { IAuthService } from './auth.service.js';
import { loginInstructorSchema, requestMagicLinkSchema, verifyMagicLinkSchema } from '@driveflow/shared';

export class AuthController {
  constructor(private authService: IAuthService) {}

  loginInstructor = async (req: Request, res: Response): Promise<void> => {
    // End-to-end validation using shared schema
    const validatedBody = loginInstructorSchema.parse(req.body);
    
    const result = await this.authService.loginInstructor(
      validatedBody.phoneNumber, 
      validatedBody.password
    );
    res.status(200).json(result);
  };

  requestMagicLink = async (req: Request, res: Response): Promise<void> => {
    const validatedBody = requestMagicLinkSchema.parse(req.body);
    
    await this.authService.requestMagicLink(validatedBody.phoneNumber);
    res.status(200).json({ message: 'Magic login link successfully sent via SMS' });
  };

  verifyMagicLink = async (req: Request, res: Response): Promise<void> => {
    // Validate query param wrapped in an object
    const validatedQuery = verifyMagicLinkSchema.parse({ token: req.query.token });
    
    const result = await this.authService.verifyMagicLink(validatedQuery.token);
    res.status(200).json(result);
  };
}