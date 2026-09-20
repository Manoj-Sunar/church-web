import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MemberService } from './members.service';
import { MemberController } from './members.controller';
import { Member, MemberSchema } from './members.schema';
import { CloudinaryModule } from '@/src/Cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Member.name, schema: MemberSchema },
    ]),
    JwtModule.register({}),
    CloudinaryModule,
    // ❌ RedisCacheModule removed — @Global() now
  ],
  providers: [MemberService],
  controllers: [MemberController],
})
export class MembersModule {}