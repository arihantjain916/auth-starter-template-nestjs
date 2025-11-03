import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export const generateToken =  (payload: any) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};

export const verifyToken =  (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
