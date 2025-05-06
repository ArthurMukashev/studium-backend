import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminRoutingModule, AppRoutingModule, ClientRoutingModule, ServiceRoutingModule } from '@/modules';
import { JwtAuthModule, LoggerModule, PrismaModule } from '@/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    PrismaModule,
    JwtAuthModule,
    AppRoutingModule,
    AdminRoutingModule,
    ClientRoutingModule,
    ServiceRoutingModule,
  ],
  providers: [],
})
export class AppModule {}
