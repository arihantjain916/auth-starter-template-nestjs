import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IUserTokenInfo } from '../interfaces/user.interfaces';

export const UserInfo = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IUserTokenInfo => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request['user'] as IUserTokenInfo;
  },
);
