import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message:
    'Too many requests sent from this IP, please try again after a minute',
});

export const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:10533'],
  credentials: true,
  allowedHeaders: [
    'set-cookie',
    'Content-Type',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
  ],
};
