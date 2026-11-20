import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { CookieOptions, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { UserInfo } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import type { IUserTokenInfo } from '../interfaces/user.interfaces';
import { ACCESS_TOKEN_COOKIE } from './auth-token';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.auth.register(dto);
    this.setTokenCookie(res, result.accessToken);
    return result;
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.auth.login(dto);
    this.setTokenCookie(res, result.accessToken);
    return result;
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE, this.cookieOptions());
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  me(@UserInfo() user: IUserTokenInfo) {
    return this.auth.me(user.id);
  }

  // Browsers get the token as a signed, httpOnly cookie; API and mobile
  // clients use the accessToken from the response body as a Bearer token.
  private setTokenCookie(res: Response, token: string) {
    const payload = decode(token) as { exp?: number } | null;
    res.cookie(ACCESS_TOKEN_COOKIE, token, {
      ...this.cookieOptions(),
      expires: payload?.exp ? new Date(payload.exp * 1000) : undefined,
    });
  }

  private cookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      signed: true,
      sameSite: 'lax',
      secure: this.config.get('env') === 'production',
      path: '/',
    };
  }
}
