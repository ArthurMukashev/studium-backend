import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from '@/common';
import { setupSwagger } from '@/lib';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useLogger(new MyLogger({ prefix: 'APP', timestamp: true }));

  app.enableCors({ origin: true, credentials: true });

  setupSwagger(app);

  await app.listen(PORT ?? 9000);
}

bootstrap().then().finally();
