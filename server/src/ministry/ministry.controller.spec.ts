import { Test, TestingModule } from '@nestjs/testing';
import { MinistryController } from './ministry.controller';
import { beforeEach, describe, it } from 'node:test';

describe('MinistryController', () => {
  let controller: MinistryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinistryController],
    }).compile();

    controller = module.get<MinistryController>(MinistryController);
  });

  it('should be defined', () => {
 
  });
});
