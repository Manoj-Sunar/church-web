import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
  imports: [
    // ✅ Load env (Docker + local safe)
    ConfigModule.forRoot({
      isGlobal: true,
      
    }),

    // ✅ FIXED Mongo config
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');

        if (!uri) {
          throw new Error('❌ MONGO_URI is not defined');
        }

        console.log('✅ Mongo URI loaded');

        return { uri };
      },
    }),

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
    AnalyticsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }