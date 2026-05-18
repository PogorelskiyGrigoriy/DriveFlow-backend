import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { UnauthorizedError, ForbiddenError } from '../../utils/app-errors.js';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: Role };
}

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export function authenticateJwt(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new UnauthorizedError('Authentication token is missing'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: Role };
    req.user = decoded;
    next();
  } catch (err) {
    next(new UnauthorizedError('Invalid or expired session token'));
  }
}

export function requireRole(role: Role) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      return next(new ForbiddenError('Access denied: insufficient permissions'));
    }
    next();
  };
}