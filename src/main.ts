import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: process.env.CORS_CREDENTIAL === 'true',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();  
