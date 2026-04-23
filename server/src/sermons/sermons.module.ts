import { Module } from '@nestjs/common';
import { SermonsService } from './sermons.service';
import { SermonsController } from './sermons.controller';
import { RedisCacheService } from '@/src/redis-chache/redis-chache.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sermons, SermonsSchema } from './sermons.schema';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from '../redis-chache/redis-chache.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sermons.name, schema: SermonsSchema },
    ]),
    JwtModule.register({

    }),
    RedisCacheModule
  ],
  providers: [SermonsService],
  controllers: [SermonsController]
})
export class SermonsModule { }
