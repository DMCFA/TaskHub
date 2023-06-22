import jwt from 'jsonwebtoken';

//set the time in days with type string
const expirationTime = '7 days';

//convert expirationTime to number
const convertExpirationTime = () => {
  const defaultNum = 7;
  const match = expirationTime.match('/d+/');
  if (match) {
    const num = parseInt(match[0], 10);
    return num;
  }
  return defaultNum;
};

//generate token
export const generateToken = (userId: number) => {
  const payload = {
    user_id: userId,
  };

  const token = jwt.sign(payload, String(process.env.JWT_KEY), {
    expiresIn: expirationTime,
  });

  return token;
};

//verify token
export const verifyToken = (token: string) => {
  try {
    const encodedToken = token.replace('Bearer ', '');
    const decodedToken = jwt.verify(encodedToken, String(process.env.JWT_KEY));
    return decodedToken;
  } catch (error) {
    throw new Error('invalid token');
  }
};

//convert expiration time to date type
export const sessionExpirationDate = () => {
  const numOfDays = convertExpirationTime();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + numOfDays);
  return expirationDate;
};
