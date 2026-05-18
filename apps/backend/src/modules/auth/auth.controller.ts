import { Request, Response, NextFunction } from 'express';
import { IAuthService } from './auth.service.js';

export class AuthController {
  constructor(private authService: IAuthService) {}

  loginInstructor = async (req: Request, res: Response): Promise<void> => {
    const { phoneNumber, password } = req.body;
    const result = await this.authService.loginInstructor(phoneNumber, password);
    res.status(200).json(result);
  };

  requestMagicLink = async (req: Request, res: Response): Promise<void> => {
    const { phoneNumber } = req.body;
    await this.authService.requestMagicLink(phoneNumber);
    res.status(200).json({ message: 'Ссылка для входа успешно отправлена' });
  };

  verifyMagicLink = async (req: Request, res: Response): Promise<void> => {
    const token = req.query.token as string;
    if (!token) {
      res.status(400).json({ error: 'Токен обязателен' });
      return;
    }
    const result = await this.authService.verifyMagicLink(token);
    res.status(200).json(result);
  };
}