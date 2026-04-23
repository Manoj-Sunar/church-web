import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageContentService } from './page-content.service';
import { PageContentController } from './page-content.controller';
import { PageContent, PageContentSchema } from './page-content.schema';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from '@/src/redis-chache/redis-chache.module';

import { CloudinaryModule } from '@/src/Cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PageContent.name, schema: PageContentSchema },
    ]),
    JwtModule.register({

    }),
    RedisCacheModule,
    CloudinaryModule
  ],
  providers: [PageContentService],
  controllers: [PageContentController],
  exports: [PageContentService],
})
export class PageContentModule { }