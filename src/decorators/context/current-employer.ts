import type { Response } from 'express';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { EmployerPayloadType } from '@/common';

export interface CustomEmployerRequest extends Response {
  user: EmployerPayloadType;
}

export const CurrentEmployer = createParamDecorator((data: unknown, context: ExecutionContext): EmployerPayloadType => {
  const request = context.switchToHttp().getRequest<CustomEmployerRequest>();
  return request.user;
});
