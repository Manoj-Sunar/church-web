import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { Member, MemberSchema } from '@/src/members/members.schema';
import { Sermons, SermonsSchema } from '@/src/sermons/sermons.schema';
import { Ministry, MinistrySchema } from '@/src/ministry/ministy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Member.name, schema: MemberSchema },
      { name: Sermons.name, schema: SermonsSchema },
      { name: Ministry.name, schema: MinistrySchema },
    ]),
    JwtModule.register({}),
    // ❌ RedisCacheModule removed — @Global() now
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}