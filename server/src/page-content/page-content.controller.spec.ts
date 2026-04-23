import { Test, TestingModule } from '@nestjs/testing';
import { PageContentController } from './page-content.controller';
import { beforeEach, describe, it } from 'node:test';

describe('PageContentController', () => {
  let controller: PageContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageContentController],
    }).compile();

    controller = module.get<PageContentController>(PageContentController);
  });

  it('should be defined', () => {
   
  });
});
