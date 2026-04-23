import { Test, TestingModule } from '@nestjs/testing';
import { PageContentService } from './page-content.service';
import { beforeEach, describe, it } from 'node:test';

describe('PageContentService', () => {
  let service: PageContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageContentService],
    }).compile();

    service = module.get<PageContentService>(PageContentService);
  });

  it('should be defined', () => {
  
  });
});
