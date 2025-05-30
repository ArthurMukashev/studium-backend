import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common';
import { RoleType } from '@prisma/client';
import { RegisterDto } from '@/modules/app/auth/dto';

@Injectable()
export class AuthRepository extends BaseRepository {
  async createUser({ dto, role_id }: { dto: RegisterDto; role_id: number }) {
    return this.prisma.user.create({
      data: {
        role_id,
        ...dto,
      },
      include: { role: true },
    });
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email }, include: { role: true } });
  }

  findRoleByName(name: RoleType) {
    return this.prisma.role.findUnique({ where: { name } });
  }
}
