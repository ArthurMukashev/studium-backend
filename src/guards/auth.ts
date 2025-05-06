import { Request as ExpressRequest } from 'express';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthService, PayloadType } from '@/common';
import { JWT_ACCESS_SECRET } from '@/constants';
import { CustomRequest, IS_PUBLIC_KEY } from '@/decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    const { access_token } = this.jwtAuthService.extractAccessTokenFromCookie(request);

    if (!access_token) {
      throw new UnauthorizedException('Токен не найден в куки.');
    }

    await this.validateToken(access_token);

    this.decodeToken(access_token, request);

    return true;
  }

  private async validateToken(token: string) {
    const validatedUser = await this.jwtAuthService.verifyToken(token, JWT_ACCESS_SECRET);

    if (!validatedUser) {
      throw new UnauthorizedException('Неверный или истекший токен.');
    }
  }

  private decodeToken(token: string, request: ExpressRequest) {
    const decodedUser = this.jwtAuthService.decodeToken<PayloadType>(token);

    if (decodedUser === null) {
      throw new UnauthorizedException('Невалидный токен');
    }

    (request as unknown as CustomRequest).user = decodedUser;
  }
}
