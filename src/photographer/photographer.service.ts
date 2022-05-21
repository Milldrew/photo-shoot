import { Injectable } from '@nestjs/common';
import { CreatePhotosService } from './create-photos/create-photos.service';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UpdatePhotographerDto } from './dto/update-photographer.dto';

@Injectable()
export class PhotographerService {
  constructor(private readonly createPhotos: CreatePhotosService) {}

  create(createPhotographerDto: CreatePhotographerDto) {
    this.createPhotos.takePhotos();
  }

  findAll() {
    return `This action returns all photographer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photographer`;
  }

  update(id: number, updatePhotographerDto: UpdatePhotographerDto) {
    return `This action updates a #${id} photographer`;
  }

  remove(id: number) {
    return `This action removes a #${id} photographer`;
  }
}
