import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageContentService } from './page-content.service';
import { PageContentController } from './page-content.controller';
import { PageContent, PageContentSchema } from './page-content.schema';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from '@/src/Cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PageContent.name, schema: PageContentSchema },
    ]),
    JwtModule.register({}),
    CloudinaryModule,
    // ❌ RedisCacheModule removed — @Global() now
  ],
  providers: [PageContentService],
  controllers: [PageContentController],
  exports: [PageContentService],
})
export class PageContentModule {}