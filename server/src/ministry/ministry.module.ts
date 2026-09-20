import { Module } from '@nestjs/common';
import { MinistryService } from './ministry.service';
import { MinistryController } from './ministry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ministry, MinistrySchema } from './ministy.schema';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from '@/src/Cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ministry.name, schema: MinistrySchema },
    ]),
    JwtModule.register({}),
    CloudinaryModule,
    // ❌ RedisCacheModule removed — @Global() now
  ],
  providers: [MinistryService],
  controllers: [MinistryController],
})
export class MinistryModule {}