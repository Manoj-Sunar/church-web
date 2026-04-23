import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as CloudinaryType } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof CloudinaryType,
  ) { }

  async uploadImage(
    file: Express.Multer.File,
    folder = 'church/page-content',
  ) {
    return new Promise<{ url: string; publicId: string, alt: string }>((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error || !result) {
            return reject(
              new InternalServerErrorException('Cloudinary upload failed'),
            );
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            alt: result.alt,
          });
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }



  // ✅ SAFE DELETE
  async deleteImage(publicId?: string) {
    if (!publicId) return;

    try {
      await this.cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
      });
    } catch (err) {
      console.error('Cloudinary delete failed:', err);
    }
  }



  // ✅ SMART REPLACE
  async replaceImage(oldPublicId?: string, newPublicId?: string) {
    try {
      if (
        oldPublicId &&
        newPublicId &&
        oldPublicId !== newPublicId
      ) {
        await this.deleteImage(oldPublicId);
      }
    } catch (err) {
      console.error('Cloudinary replace cleanup failed:', err);
    }
  }



}