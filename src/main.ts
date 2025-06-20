import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import './db';

async function bootstrap() {
  const port: number = 3000;
  const app = await NestFactory.create(AppModule);
  log(`http://localhost:${port}`);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
