import { Module } from '@nestjs/common';
import { LeaderService } from './leader.service';
import { LeaderController } from './leader.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Leader, LeaderSchema } from './leader.schema';
import { JwtModule } from '@nestjs/jwt';

import { CloudinaryModule } from '@/src/Cloudinary/cloudinary.module';
import { RedisCacheModule } from '../redis-chache/redis-chache.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Leader.name, schema: LeaderSchema }]),
  JwtModule.register({}),
  CloudinaryModule,
  RedisCacheModule
  ],
  providers: [LeaderService],
  controllers: [LeaderController]
})
export class LeaderModule { }
