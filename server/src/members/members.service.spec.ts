import { Test, TestingModule } from '@nestjs/testing';

import { beforeEach, describe, it } from 'node:test';
import { MemberService } from './members.service';

describe('MembersService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberService],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
   
  });
});
