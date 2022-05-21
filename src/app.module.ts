import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotographerModule } from './photographer/photographer.module';

@Module({
  imports: [PhotographerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
