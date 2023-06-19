import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message:
    'Too many requests sent from this IP, please try again after a minute',
});
