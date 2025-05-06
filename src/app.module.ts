import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminRoutingModule, AppRoutingModule, ClientRoutingModule, ServiceRoutingModule } from '@/modules';
import { PrismaModule, LoggerModule } from '@/common';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		LoggerModule,
		PrismaModule,
		AppRoutingModule,
		ClientRoutingModule,
		AdminRoutingModule,
		ServiceRoutingModule,
	],
})
export class AppModule {}
