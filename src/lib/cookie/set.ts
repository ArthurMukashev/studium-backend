import type { CookieOptions, Response as ExpressResponse } from 'express';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';

class SetCookie {
  private readonly cookieOptions: CookieOptions;

  constructor() {
    this.cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };
  }

  accessToken(res: ExpressResponse, value: string) {
    const cookieOptions: CookieOptions = {
      ...this.cookieOptions,
      maxAge: 1000 * 60 * 30, // 30 минут
    };
    return res.cookie(ACCESS_TOKEN, value, cookieOptions);
  }

  refreshToken(res: ExpressResponse, value: string) {
    const cookieOptions: CookieOptions = {
      ...this.cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 дня
    };
    return res.cookie(REFRESH_TOKEN, value, cookieOptions);
  }
}

export const setCookie: SetCookie = new SetCookie();
