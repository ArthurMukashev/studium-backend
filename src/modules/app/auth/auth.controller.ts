import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация в системе' })
  register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.register({ dto, res });
  }

  @Post('login')
  @ApiOperation({ summary: 'Вход в систему' })
  login() {}

  @Post('forgot-password')
  @ApiOperation({ summary: 'Забыл пароль' })
  forgotPassword() {}

  @Get('logout')
  @ApiOperation({ summary: 'Выход из системы' })
  logout() {}
}
