import { Module } from '@nestjs/common';
import { UploadImageController } from './upload-image.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { GuardModule } from '../guard/guard.module';


@Module({
  imports: [GuardModule],
  controllers: [UploadImageController],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule { }