import * as jwt from 'jsonwebtoken';

export type JwtPayload = { id: string; role?: string };

export const signJwt = (
  payload: JwtPayload,
  secret: string,
  expiresIn: jwt.SignOptions['expiresIn'],
) => jwt.sign(payload, secret, { expiresIn });

// Throws jsonwebtoken's own errors (TokenExpiredError, JsonWebTokenError) so
// callers can tell an expired token from an invalid one.
export const verifyJwt = (token: string, secret: string) =>
  jwt.verify(token, secret) as JwtPayload & jwt.JwtPayload;
