import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { beforeEach, describe, it } from 'node:test';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
