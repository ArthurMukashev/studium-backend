import { EventEmitterModule } from '@nestjs/event-emitter';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
import { BasicCommand } from '@/commands';
import { JwtAuthModule, LoggerModule, PrismaModule } from '@/common';
import { AuthGuard, RolesGuard } from '@/guards';
import { RefreshTokenMiddleware } from '@/middlewares';
import { AdminRoutingModule, AppRoutingModule, ClientRoutingModule, ServiceRoutingModule } from '@/modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    LoggerModule,
    PrismaModule,
    JwtAuthModule,
    AppRoutingModule,
    AdminRoutingModule,
    ClientRoutingModule,
    ServiceRoutingModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    BasicCommand,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RefreshTokenMiddleware).forRoutes('*');
  }
}
