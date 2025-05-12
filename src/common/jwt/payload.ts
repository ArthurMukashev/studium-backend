import type { User, RoleType } from '@prisma/client';

export interface PayloadType {
  id: User['id'];
  role: RoleType;
  is_superadmin: boolean;
}

export interface PayloadRefreshType {
  id: User['id'];
  is_superadmin: boolean;
  role?: RoleType;
  iat?: number;
  exp?: number;
}
