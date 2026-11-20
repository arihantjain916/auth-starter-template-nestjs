import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedSocket } from '../interfaces/socket.interface';
import { extractWsUser } from '../utils/ws-auth';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<AuthenticatedSocket>();
    client.user = await extractWsUser(client, this.config, this.prisma);
    return true;
  }
}
