import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotographerModule } from './photographer/photographer.module';
import { join } from 'path';

@Module({
  imports: [PhotographerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
