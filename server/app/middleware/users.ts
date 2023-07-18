import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
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

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.user_id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    if (!user.is_admin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.error('Error checking admin:', error);
    res.status(500).json({ error: 'Failed to check admin status' });
  }
};
