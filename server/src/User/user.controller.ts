import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserService } from './user.service';
import { Public } from '@/src/decorator/public.decorator';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private cookieOptions(isRefresh = false) {
    const isProd = process.env.NODE_ENV === 'production';

    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? ('strict' as const) : ('lax' as const),
      path: '/',
      maxAge: isRefresh ? 7 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000,
    };
  }

  // =========================
  // REGISTER (ADMIN ONLY SYSTEM)
  // =========================
  @Public()
  @Post('register')
  async register(@Body() dto, @Res({ passthrough: true }) res: Response) {
    const result = await this.userService.createUser(dto);

    res.cookie('accessToken', result.accessToken, this.cookieOptions());
    res.cookie('refreshToken', result.refreshToken, this.cookieOptions(true));

    return {
      message: 'Admin created',
      user: result.user,
    };
  }

  // =========================
  // LOGIN
  // =========================
  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() body, @Res({ passthrough: true }) res: Response) {
    const result = await this.userService.loginUser(body.email, body.password);

    res.cookie('accessToken', result.accessToken, this.cookieOptions());
    res.cookie('refreshToken', result.refreshToken, this.cookieOptions(true));

    return {
      success:true,
      message: 'Login successful',
      user: result.user,
    };
  }

  // =========================
  // REFRESH (POST IS CORRECT)
  // =========================
  @Public()
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken;

    if (!token) throw new UnauthorizedException('No refresh token');

    const result = await this.userService.refreshAccessToken(token);

    res.cookie('accessToken', result.accessToken, this.cookieOptions());
    res.cookie('refreshToken', result.refreshToken, this.cookieOptions(true));

    return {
      message: 'Token refreshed',
      user: result.user,
    };
  }

  // =========================
  // LOGOUT
  // =========================
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = (req as any).user;

    if (user?.id) {
      await this.userService.logoutUser(user.id);
    }

    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });

    return { message: 'Logged out' };
  }
}