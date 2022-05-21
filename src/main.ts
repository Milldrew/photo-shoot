import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT || 3000;
  app.enableCors();
  const pathToPhotos = join(__dirname, '..', 'photographer_photos');
  console.log(pathToPhotos);
  app.useStaticAssets(pathToPhotos);
  await app.listen(PORT);
  console.log(PORT);
}
bootstrap();
