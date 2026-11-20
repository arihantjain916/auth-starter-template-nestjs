import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import {
  ACCESS_TOKEN_COOKIE,
  authenticateToken,
  readSignedCookie,
} from '../auth/auth-token';
import type { IUserTokenInfo } from '../interfaces/user.interfaces';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Extracts and verifies the user from a WebSocket handshake. The token can come
 * from `auth.token`, `query.token`, an `Authorization: Bearer` header or the
 * signed ACCESS_TOKEN cookie. Throws UnauthorizedException if it is missing or
 * invalid. Use it in a gateway's handleConnection, or through WsJwtGuard.
 */
export async function extractWsUser(
  client: Socket,
  config: ConfigService,
  prisma: PrismaService,
): Promise<IUserTokenInfo> {
  const { auth, query, headers } = client.handshake;
  const [type, bearer] = headers.authorization?.split(' ') ?? [];

  const token =
    (auth?.token as string | undefined) ??
    (typeof query?.token === 'string' ? query.token : undefined) ??
    (type === 'Bearer' ? bearer : undefined) ??
    readSignedCookie(
      headers.cookie,
      ACCESS_TOKEN_COOKIE,
      config.getOrThrow<string>('cookieSecret'),
    );

  return authenticateToken(
    token,
    config.getOrThrow<string>('jwt.secret'),
    prisma,
  );
}
