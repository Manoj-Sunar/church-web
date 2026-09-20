import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisCacheService.name);

  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  onModuleInit() {
    // ✅ DO NOT create a new Redis client here.
    // The provider (redis.provider.ts) already created and owns the single
    // shared client. We only attach listeners.
    this.redis.on('connect', () =>
      this.logger.log('Redis connected'),
    );
    this.redis.on('ready', () =>
      this.logger.log('Redis ready'),
    );
    this.redis.on('error', (err) =>
      this.logger.error(`Redis error: ${err.message}`),
    );
    this.redis.on('close', () =>
      this.logger.warn('Redis connection closed'),
    );
    this.redis.on('reconnecting', () =>
      this.logger.warn('Redis reconnecting...'),
    );
  }

  async onModuleDestroy() {
    // ✅ The provider owns the client — do NOT quit here.
    // Quitting here caused the "closed → reconnecting" loop because multiple
    // service instances were quitting the shared connection.
    // If you want a clean shutdown, do it in the provider or via
    // app.enableShutdownHooks() in main.ts.
  }

  async set<T>(key: string, value: T, expireSeconds?: number): Promise<void> {
    const stringValue = JSON.stringify(value);

    if (expireSeconds) {
      await this.redis.set(key, stringValue, 'EX', expireSeconds);
      return;
    }

    await this.redis.set(key, stringValue);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redis.exists(key)) === 1;
  }

  async ttl(key: string): Promise<number> {
    return this.redis.ttl(key);
  }

  getClient(): Redis {
    return this.redis;
  }
}