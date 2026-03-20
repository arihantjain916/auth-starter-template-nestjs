// import { IUserTokenInfo } from '@interfaces/user.interface';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { USER_MESSAGES } from '@src/constants/messages';
// import { verifyAccessToken } from '@utils/functions';
import { Socket } from 'socket.io';
import type { IUserTokenInfo } from 'src/interfaces/user.interfaces';
import { verifyJwt } from './functions';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Extracts and verifies a user from a WebSocket handshake.
 * - Reads token from `auth.token` or `query.token`
 * - Verifies JWT using secret from ConfigService
 * - Returns decoded user info
 * - Throws UnauthorizedException if invalid/missing
 */
export async function extractWsUser(
  client: Socket,
  configService: ConfigService,
  prisma: PrismaService,
): Promise<IUserTokenInfo | null> {
  const token =
    client.handshake?.auth?.token || client.handshake?.query?.token || null;

  if (!token) {
    throw new UnauthorizedException('Token not found');
  }

  const jwtSecret = configService.getOrThrow<string>('jwt.secret');

  try {
    const decodedToken = verifyJwt(token, jwtSecret);

    // const user = await prisma.user.findUnique({
    //   where: { id: decodedToken.id },
    //   // include: { connections: true, settings: true, profile: true },
    // });

    // if (!user) {
    //   throw new UnauthorizedException('Invalid token');
    // }
    // decodedToken.role = [user.role];

    (client as any).user = decodedToken;
    return null;
  } catch (error) {
    throw new UnauthorizedException('Invalid token');
  }
}
