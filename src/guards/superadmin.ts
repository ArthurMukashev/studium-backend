// import { CanActivate, ExecutionContext } from '@nestjs/common';
// import { CustomEmployerRequest } from '@/decorators';
//
// export class SuperAdminGuard implements CanActivate {
//   constructor() {}
//
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest<CustomEmployerRequest>();
//     return request.user.is_superadmin;
//   }
// }
