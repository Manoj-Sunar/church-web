import { Module } from '@nestjs/common';
import { MinistryService } from './ministry.service';
import { MinistryController } from './ministry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ministry, MinistrySchema } from './ministy.schema';
import { RedisCacheModule } from '@/src/redis-chache/redis-chache.module';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from '@/src/Cloudinary/cloudinary.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ministry.name, schema: MinistrySchema }],),
  JwtModule.register({

  }),
    RedisCacheModule,
    CloudinaryModule
  ],
  providers: [MinistryService],
  controllers: [MinistryController]
})
export class MinistryModule { }
