import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { CustomRequest } from '@/decorators';

export class SuperAdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    return request.user.is_superadmin;
  }
}
