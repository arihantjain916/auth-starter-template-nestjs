import * as jwt from 'jsonwebtoken';

export const signJwt = (
  payload: Record<string, unknown>,
  secret: string,
  expiresIn: number,
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyJwt = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    throw new Error('Invalid token');
  }
};
