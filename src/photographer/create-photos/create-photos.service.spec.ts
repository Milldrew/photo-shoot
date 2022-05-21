import { Test, TestingModule } from '@nestjs/testing';
import { CreatePhotosService } from './create-photos.service';

describe('CreatePhotosService', () => {
  let service: CreatePhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePhotosService],
    }).compile();

    service = module.get<CreatePhotosService>(CreatePhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
