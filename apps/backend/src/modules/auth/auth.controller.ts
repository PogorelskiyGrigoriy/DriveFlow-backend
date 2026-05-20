import { Request, Response } from 'express';
import { IAuthService } from './auth.service.js';
import { LoginInstructorSchema, RequestMagicLinkSchema, VerifyMagicLinkSchema } from '@driveflow/shared';

export class AuthController {
  constructor(private authService: IAuthService) {}

  /**
   * HTTP Handler for instructor login via password.
   */
  loginInstructor = async (req: Request, res: Response): Promise<void> => {
    const validatedBody = LoginInstructorSchema.parse(req.body);
    
    const result = await this.authService.loginInstructor(
      validatedBody.phoneNumber, 
      validatedBody.password
    );
    
    res.status(200).json(result);
  };

  /**
   * HTTP Handler to trigger SMS dispatch of a magic login link.
   */
  requestMagicLink = async (req: Request, res: Response): Promise<void> => {
    const validatedBody = RequestMagicLinkSchema.parse(req.body);
    
    await this.authService.requestMagicLink(validatedBody.phoneNumber);
    
    res.status(200).json({ message: 'Magic login link successfully sent via SMS' });
  };

  /**
   * HTTP Handler to consume a magic token and exchange it for a session.
   */
  verifyMagicLink = async (req: Request, res: Response): Promise<void> => {
    const validatedQuery = VerifyMagicLinkSchema.parse({ token: req.query.token });
    
    const result = await this.authService.verifyMagicLink(validatedQuery.token);
    
    res.status(200).json(result);
  };
}