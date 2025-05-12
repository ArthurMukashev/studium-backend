import { Injectable } from '@nestjs/common';
import { MyLogger } from '@/common';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private logger: MyLogger,
  ) {
    this.logger.setContext(ProfileService.name);
  }
}
