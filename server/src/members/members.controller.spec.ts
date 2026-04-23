import { Test, TestingModule } from '@nestjs/testing';

import { beforeEach, describe, it } from 'node:test';
import { MemberController } from './members.controller';

describe('MembersController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    
  });
});
