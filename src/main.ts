import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from '@/common';
import { setupSwagger } from '@/lib';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(new MyLogger({ prefix: 'APP', timestamp: true }));

  app.use(cookieParser());
  app.enableCors({ origin: true, credentials: true });

  setupSwagger(app);

  await app.listen(PORT ?? 9000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap()
  .then(() => {
    new MyLogger({ context: 'APP' }).debug(`APP STARTED ON PORT ${process.env.PORT ?? 9000}`);
  })
  .finally();
