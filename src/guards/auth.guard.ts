import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ACCESS_TOKEN_COOKIE, authenticateToken } from '../auth/auth-token';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const cookies = request.signedCookies as Record<string, string | undefined>;
    const [type, bearer] = request.headers.authorization?.split(' ') ?? [];
    const token =
      cookies?.[ACCESS_TOKEN_COOKIE] ?? (type === 'Bearer' ? bearer : null);

    request['user'] = await authenticateToken(
      token,
      this.config.getOrThrow<string>('jwt.secret'),
      this.prisma,
    );
    return true;
  }
}
