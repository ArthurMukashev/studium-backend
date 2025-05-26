import { Injectable } from '@nestjs/common';
import { MyLogger, PrismaService } from '@/common';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  private readonly repository: ProfileRepository;

  constructor(
    private readonly prisma: PrismaService,
    private logger: MyLogger,
  ) {
    this.repository = new ProfileRepository(prisma);
    this.logger.setContext(ProfileService.name);
  }

  getProfile(id: number) {
    return this.repository.getProfile(id);
  }
}
