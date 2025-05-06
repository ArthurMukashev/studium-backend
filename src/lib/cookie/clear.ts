import type { Response as ExpressResponse } from 'express';

export function clearCookie({ res, name }: { res: ExpressResponse; name: string }): void {
  res.clearCookie(name, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
}
