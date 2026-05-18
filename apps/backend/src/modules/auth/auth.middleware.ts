import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: Role };
}

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export function authenticateJwt(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Токен авторизации отсутствует' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: Role };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Недействительный или просроченный токен сессии' });
  }
}

export function requireRole(role: Role) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ error: 'Доступ запрещен: недостаточно прав' });
      return;
    }
    next();
  };
}