import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/auth.decorator';
import type { Role } from '../generated/prisma/client';
import { IUserTokenInfo } from '../interfaces/user.interfaces';

/** Use after AuthGuard: @UseGuards(AuthGuard, RolesGuard) */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[] | undefined>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // No @Roles() on the route: any authenticated user may access it
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'] as IUserTokenInfo | undefined;
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    if (!requiredRoles.some((role) => user.role.includes(role))) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return true;
  }
}
