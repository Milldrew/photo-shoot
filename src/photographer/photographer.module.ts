import { Module } from '@nestjs/common';
import { PhotographerService } from './photographer.service';
import { PhotographerController } from './photographer.controller';
import { CreatePhotosService } from './create-photos/create-photos.service';
import { DevicesService } from './create-photos/devices/devices.service';

@Module({
  controllers: [PhotographerController],
  providers: [PhotographerService, CreatePhotosService, DevicesService],
})
export class PhotographerModule {}
