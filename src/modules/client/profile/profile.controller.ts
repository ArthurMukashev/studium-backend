import { Controller, Get } from '@nestjs/common';
import { PayloadType } from '@/common';
import { CurrentAuthUser } from '@/decorators';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@CurrentAuthUser() currentUser: PayloadType) {
    return this.profileService.getProfile(currentUser.id);
  }
}
