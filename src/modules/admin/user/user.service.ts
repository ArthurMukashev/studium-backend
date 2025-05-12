import { Injectable } from '@nestjs/common';
import { MyLogger } from '@/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserService.name);
  }
}
