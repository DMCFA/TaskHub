import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../utils/tokenUtils';
import { UserInstance } from '../../types/User';

declare global {
  namespace Express {
    interface Request {
      user?: UserInstance;
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is required' });
  }

  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken as UserInstance;

    next();
  } catch (error) {
    console.error('Error verifying token', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
