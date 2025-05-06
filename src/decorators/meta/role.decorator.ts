import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@prisma/client';

export const ROLES_KEY = 'role';
export const Role = (role: RoleType[]) => SetMetadata(ROLES_KEY, role);
