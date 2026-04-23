import { Test, TestingModule } from '@nestjs/testing';
import { SermonsService } from './sermons.service';
import { beforeEach, describe, it } from 'node:test';

describe('SermonsService', () => {
  let service: SermonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SermonsService],
    }).compile();

    service = module.get<SermonsService>(SermonsService);
  });

  it('should be defined', () => {
  
  });
});
