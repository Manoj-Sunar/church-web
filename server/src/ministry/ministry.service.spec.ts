import { Test, TestingModule } from '@nestjs/testing';
import { MinistryService } from './ministry.service';
import { beforeEach, describe, it } from 'node:test';

describe('MinistryService', () => {
  let service: MinistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinistryService],
    }).compile();

    service = module.get<MinistryService>(MinistryService);
  });

  it('should be defined', () => {
    
  });
});
