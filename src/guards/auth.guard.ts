import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verifyToken } from 'src/utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const cookieToken = request.signedCookies?.ACCESS_TOKEN;

    const token =
      cookieToken ||
      (authHeader && authHeader.startsWith('Bearer')
        ? authHeader.split(' ')[1]
        : null);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const decodedToken = verifyToken(token);

    if(!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = decodedToken;

    return true;
  }
}
