import { Module } from '@nestjs/common';
import { PhotographerService } from './photographer.service';
import { PhotographerController } from './photographer.controller';
import { CreatePhotosService } from './create-photos/create-photos.service';

@Module({
  controllers: [PhotographerController],
  providers: [PhotographerService, CreatePhotosService]
})
export class PhotographerModule {}
