import type { Request, Response } from 'express';
import type { Nullable } from '@/types';
import { HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService, MyLogger, PayloadRefreshType } from '@/common';
import { ACCESS_TOKEN, JWT_REFRESH_SECRET, REFRESH_TOKEN } from '@/constants';
import { clearCookie, setCookie } from '@/lib';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(RefreshTokenMiddleware.name);
  }

  async use(req: Request, res: Response, next: () => void) {
    const refreshToken = req.cookies[REFRESH_TOKEN] as Nullable<string>;
    const accessToken = req.cookies[ACCESS_TOKEN] as Nullable<string>;

    if (!accessToken && refreshToken) {
      try {
        await this.jwtAuthService.verifyToken(refreshToken, JWT_REFRESH_SECRET);
        const tokens = await this.generateTokens(refreshToken);

        setCookie.accessToken(res, tokens.access_token);
        setCookie.refreshToken(res, tokens.refresh_token);

        req.cookies[ACCESS_TOKEN] = tokens.access_token;

        next();
      } catch (error) {
        this.logger.error(error as string);
        clearCookie({ res, name: REFRESH_TOKEN });
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Ошибка обновления токена',
        });
      }
    }

    next();
  }

  private generateTokens(token: string) {
    const oldToken = this.jwtAuthService.decodeToken<PayloadRefreshType>(token);

    if (!oldToken) {
      throw new UnauthorizedException('Refresh token не найден');
    }

    delete oldToken.exp;
    delete oldToken.iat;

    return this.jwtAuthService.generateUserTokens({ ...oldToken });
  }
}
