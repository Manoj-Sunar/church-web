import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheService } from '@/src/redis-chache/redis-chache.service';
import { MemberService } from './members.service';
import { MemberController } from './members.controller';
import { Member, MemberSchema } from './members.schema';
import { CloudinaryModule } from '@/src/Cloudinary/cloudinary.module';
import { RedisCacheModule } from '../redis-chache/redis-chache.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Member.name,schema:MemberSchema}]),JwtModule.register({}),CloudinaryModule,RedisCacheModule],
  providers: [MemberService],
  controllers: [MemberController]
})
export class MembersModule {}
