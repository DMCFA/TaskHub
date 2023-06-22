import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ error: 'Global Internal Server Error' });

  next();
};
