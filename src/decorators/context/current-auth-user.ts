import type { Response } from 'express';
import type { PayloadType } from '@/common';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export interface CustomRequest extends Response {
  user: PayloadType;
}

export const CurrentAuthUser = createParamDecorator((data: unknown, context: ExecutionContext): PayloadType => {
  const request = context.switchToHttp().getRequest<CustomRequest>();
  return request.user;
});
