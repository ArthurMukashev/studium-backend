import { Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtAuthService } from '@/common';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import { Nullable } from '@/types';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  async use(req: Request, res: Response, next: () => void) {
    const refreshToken = req.cookies[REFRESH_TOKEN] as Nullable<string>;
    const accessToken = req.cookies[ACCESS_TOKEN] as Nullable<string>;

    if (!accessToken && refreshToken) {
    }

    next();
  }

  private generateTokens(token: string) {
    const oldToken = this.jwtAuthService;
  }
}
