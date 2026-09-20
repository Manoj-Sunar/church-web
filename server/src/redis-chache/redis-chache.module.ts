import { Global, Module } from '@nestjs/common';
import { RedisCacheService } from './redis-chache.service';
import { RedisProvider } from './redis.provider';

@Global() // ✅ Makes RedisCacheService available everywhere without re-importing
@Module({
  providers: [RedisCacheService, RedisProvider],
  exports: [RedisCacheService, RedisProvider],
})
export class RedisCacheModule {}