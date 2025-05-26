import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common';

@Injectable()
export class ProfileRepository extends BaseRepository {
  getProfile(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true, role_id: true },
      include: { role: true },
    });
  }
}
