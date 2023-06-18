import jwt from 'jsonwebtoken';

export const generateToken = (userId: number) => {
  const payload = {
    userId: userId,
  };

  const token = jwt.sign(payload, String(process.env.JWT_KEY), {
    expiresIn: '7 days',
  });

  return token;
};
