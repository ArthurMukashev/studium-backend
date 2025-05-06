import type { User, Organization, Employer, RoleType, Position, Department } from '@prisma/client';

export interface PayloadType {
  id: User['id'];
  is_superadmin: boolean;
}

export interface EmployerPayloadType extends PayloadType {
  organization_id: Organization['id'];
  employer_id: Employer['id'];
  role: RoleType;
  department_id?: Department['id'];
  position_id?: Position['id'];
}

export interface PayloadRefreshType {
  id: User['id'];
  is_superadmin: boolean;
  organization_id?: Organization['id'];
  employer_id?: Employer['id'];
  role?: RoleType;
  department_id?: Department['id'];
  position_id?: Position['id'];
  iat?: number;
  exp?: number;
}
