import { UnauthorizedException } from '@nestjs/common';
import { signedCookie } from 'cookie-parser';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { IUserTokenInfo } from '../interfaces/user.interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { verifyJwt } from '../utils/functions';

export const ACCESS_TOKEN_COOKIE = 'ACCESS_TOKEN';

/**
 * Verifies a JWT, loads the user it belongs to and returns the info guards
 * attach to the request. Throws UnauthorizedException with a specific message
 * for a missing, expired or invalid token, or a user that no longer exists.
 */
export async function authenticateToken(
  token: string | undefined | null,
  secret: string,
  prisma: PrismaService,
): Promise<IUserTokenInfo> {
  if (!token) {
    throw new UnauthorizedException('Token not found');
  }

  let decoded: ReturnType<typeof verifyJwt>;
  try {
    decoded = verifyJwt(token, secret);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token expired');
    }
    if (error instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token');
    }
    throw new UnauthorizedException('Authentication failed');
  }

  // Load the role from the database, so a role change or a deleted user takes
  // effect immediately instead of when the token expires.
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, role: true },
  });
  if (!user) {
    throw new UnauthorizedException('Invalid token');
  }

  return { id: user.id, role: [user.role], iat: decoded.iat, exp: decoded.exp };
}

/** Reads a signed cookie from a raw Cookie header (used for WebSockets). */
export function readSignedCookie(
  cookieHeader: string | undefined,
  name: string,
  secret: string,
): string | undefined {
  const raw = cookieHeader
    ?.split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`))
    ?.slice(name.length + 1);
  if (!raw) return undefined;

  const value = signedCookie(decodeURIComponent(raw), secret);
  return typeof value === 'string' ? value : undefined;
}
