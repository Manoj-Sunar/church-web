import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { beforeEach, describe, it } from 'node:test';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService],
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
