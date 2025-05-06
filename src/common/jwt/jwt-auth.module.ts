import { Global, Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';

@Global()
@Module({
  providers: [JwtAuthService],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
