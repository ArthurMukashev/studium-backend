import type { Response } from 'express';
import { LoginDto, RegisterDto } from './dto';
import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import { Public } from '@/decorators';
import { clearCookie } from '@/lib';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Регистрация в системе' })
  register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(dto, res);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Вход в систему' })
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  // @Post('forgot-password')
  // @ApiOperation({ summary: 'Забыл пароль' })
  // forgotPassword() {}

  @Get('logout')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Выход из системы' })
  logout(@Res({ passthrough: true }) res: Response) {
    clearCookie({ res, name: ACCESS_TOKEN });
    clearCookie({ res, name: REFRESH_TOKEN });
    res.send().status(HttpStatus.OK);
  }
}
