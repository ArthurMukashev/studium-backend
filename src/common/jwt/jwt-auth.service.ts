import type { Request } from 'express';
import type { CookiePayload, TokensType } from '@/types';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JWT_ACCESS_EXPIRES, JWT_ACCESS_SECRET, JWT_REFRESH_EXPIRES, JWT_REFRESH_SECRET } from '@/constants';
import { MyLogger } from '@/common';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(JwtAuthService.name);
  }

  async verifyToken(token: string, configKey: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.getJwtSecretAccess(configKey),
      });
      return true;
    } catch (err) {
      this.logger.error(err as string);
      throw new UnauthorizedException('Токен невалиден');
    }
  }

  decodeToken<T extends object>(token: string): T | null {
    return this.jwtService.decode(token);
  }

  extractAccessTokenFromCookie(request: Request): Pick<TokensType, 'access_token'> {
    const cookies = request.cookies as CookiePayload;

    const { access_token } = cookies;

    if (typeof access_token !== 'string') {
      throw new UnauthorizedException('Access токена нет или он не валиден.');
    }

    return { access_token };
  }

  private getJwtSecretAccess(configKey: string): string {
    const secret = this.configService.get<string>(configKey);

    if (secret == null) {
      throw new InternalServerErrorException('Секрет JWT для Access token не найден в конфигурации');
    }

    return secret;
  }

  private async generate<T extends object>(payload: T, options?: JwtSignOptions) {
    return await this.jwtService.signAsync(payload, options);
  }

  async generateUserTokens<T extends object>(payload: T): Promise<TokensType> {
    const [access_token, refresh_token]: [string, string] = await Promise.all([
      this.generate(payload, {
        secret: this.configService.get(JWT_ACCESS_SECRET),
        expiresIn: this.configService.get(JWT_ACCESS_EXPIRES),
      }),
      this.generate(payload, {
        secret: this.configService.get(JWT_REFRESH_SECRET),
        expiresIn: this.configService.get(JWT_REFRESH_EXPIRES),
      }),
    ]);

    return { access_token, refresh_token };
  }
}
