import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will strip out any properties that don't have any decorators on them
      forbidNonWhitelisted: true, // This will throw an error if any properties that don't have any decorators on them
      // transform: true,
    }),
  ); // 👈 new line
  await app.listen(3000);
}
bootstrap();
