import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS cho frontend Render & local dev
  app.enableCors({
    origin: [
      "https://ia06-frontend-y9g3.onrender.com", // frontend deployed
      "http://localhost:5173",                   // local React dev
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // Render cung cấp PORT qua biến môi trường PORT
  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}

bootstrap();
