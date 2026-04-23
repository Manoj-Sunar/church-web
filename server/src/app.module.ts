import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
import { RedisCacheModule } from './redis-chache/redis-chache.module';
import { PageContentModule } from './page-content/page-content.module';
import { GuardModule } from './guard/guard.module';
import { CloudinaryModule } from './Cloudinary/cloudinary.module';
import { SermonsModule } from './sermons/sermons.module';
import { MinistryModule } from './ministry/ministry.module';
import { EventModule } from './event/event.module';
import { ContactModule } from './contact/contact.module';
import { LeaderModule } from './leader/leader.module';
import { MembersModule } from './members/members.module';
import { AnalyticsModule } from './analytics/analytics.module';





@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URI!),
    UserModule,
    RedisCacheModule,
    PageContentModule,
    GuardModule,
    CloudinaryModule,
    SermonsModule,
    MinistryModule,
    EventModule,
    ContactModule,
    LeaderModule,
    MembersModule,
    AnalyticsModule

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
