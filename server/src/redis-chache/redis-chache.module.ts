import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-chache.service';
import { RedisProvider } from './redis.provider';

@Module({
  providers: [RedisCacheService, RedisProvider],
  exports: [RedisCacheService, RedisProvider], // ✅ export both
})
export class RedisCacheModule {}