import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from '@/src/guard/Auth.guard';
import { RolesGuard } from '@/src/guard/Authorization.guard';
import { UserRole } from '@/src/Enum/user-role.enum';
import { Roles } from '@/src/decorator/roles.decorator';

@Controller('admin/uploads')
export class UploadImageController {
  constructor(private readonly cloudinaryService: CloudinaryService) { }

  @Post('image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (_req, file, cb) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/avif',
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Only jpeg, png, webp, and avif files are allowed.',
            ),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )


  
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image file is required.');
    }

    return this.cloudinaryService.uploadImage(file);
  }
}