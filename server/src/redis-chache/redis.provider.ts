import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const host = config.get<string>('REDIS_HOST');
    const port = config.get<number>('REDIS_PORT');
    const password = config.get<string>('REDIS_PASSWORD');

    if (!host || !port) {
      throw new Error(
        '❌ Redis env variables missing (REDIS_HOST / REDIS_PORT)',
      );
    }

    const redis = new Redis({
      host,
      port,
      password,                 // ✅ Aiven requires a password
      tls: {},                  // ✅ Aiven requires TLS
      maxRetriesPerRequest: 20,
      enableReadyCheck: true,
      lazyConnect: false,
      retryStrategy: (times) => Math.min(times * 200, 2000),
      reconnectOnError: (err) => {
        // Reconnect only on READONLY errors (e.g., after failover)
        return err.message.includes('READONLY');
      },
    });

    redis.on('connect', () => console.log('✅ Redis connected'));
    redis.on('ready', () => console.log('✅ Redis ready'));
    redis.on('error', (err) =>
      console.error('❌ Redis error:', err.message),
    );
    redis.on('close', () => console.warn('⚠️ Redis connection closed'));
    redis.on('reconnecting', () =>
      console.warn('⚠️ Redis reconnecting...'),
    );

    return redis;
  },
};