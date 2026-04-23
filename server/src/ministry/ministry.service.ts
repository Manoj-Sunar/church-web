import {
  Injectable,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RedisCacheService } from '@/src/redis-chache/redis-chache.service';


import { Ministry, MinistryDocument } from './ministy.schema';
import { CreateMinistryDto } from './ministry.dto';
import { CloudinaryService } from '@/src/Cloudinary/cloudinary.service';

@Injectable()
export class MinistryService {
  private readonly TTL = 60 * 60; // 1 hour
  private readonly DEFAULT_LIMIT = 10;

  constructor(
    @InjectModel(Ministry.name)
    private readonly ministryModel: Model<MinistryDocument>,
    private readonly redisCacheService: RedisCacheService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  // =========================
  // CACHE KEYS
  // =========================
  private getSingleKey(id: string) {
    return `ministry:${id}`;
  }

  private getListKey(page: number, limit: number) {
    return `ministries:page:${page}:limit:${limit}`;
  }

  // =========================
  // CREATE MINISTRY + IMAGE UPLOAD
  // =========================
  async create(dto: CreateMinistryDto) {
    try {
      const slug = dto.slug.trim();

      const existing = await this.ministryModel.findOne({ slug }).lean();
      if (existing) {
        throw new ConflictException({
          message: 'Slug already exists',
          field: 'slug',
        });
      }



      const ministry = await this.ministryModel.create({
        ...dto,
        slug,
        name: dto.name.trim(),
        leader: dto.leader.trim(),
        description: dto.description.trim(),
        longDescription: dto.longDescription.trim(),
        image: dto.image,
      });

      const result = ministry.toObject();

      await this.redisCacheService.set(
        this.getSingleKey(result._id.toString()),
        result,
        this.TTL,
      );

      await this.invalidateListCache();

      return {
        success: true,
        message: 'Ministry created successfully',
        data: result,
      };
    } catch (error: any) {
      if (error instanceof ConflictException) throw error;

      if (error.code === 11000) {
        throw new ConflictException({
          message: 'Duplicate field value',
          field: Object.keys(error.keyValue)[0],
        });
      }

      throw new InternalServerErrorException({
        message: 'Failed to create ministry',
      });
    }
  }

  // =========================
  // GET ALL
  // =========================
  async findAll(page = 1, limit = this.DEFAULT_LIMIT) {
    try {
      page = Math.max(1, Number(page));
      limit = Math.min(50, Number(limit));

      const cacheKey = this.getListKey(page, limit);

      const cached = await this.redisCacheService.get(cacheKey);
      if (cached) return cached;

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.ministryModel
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .select('-__v')
          .lean(),
        this.ministryModel.countDocuments(),
      ]);

      const result = {
        success: true,
        message: 'Ministries fetched successfully',
        data,
        pagination: {
          total,
          page,
          limit,
          hasMore: skip + data.length < total,
        },
      };

      await this.redisCacheService.set(cacheKey, result, this.TTL);

      return result;
    } catch {
      throw new InternalServerErrorException({
        message: 'Failed to fetch ministries',
      });
    }
  }

  // =========================
  // GET BY ID
  // =========================
  async findById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException({ message: 'Ministry ID is required' });
      }

      const cacheKey = this.getSingleKey(id);

      const cached = await this.redisCacheService.get(cacheKey);
      if (cached) {
        return {
          success: true,
          message: 'Ministry fetched from cache',
          data: cached,
        };
      }

      const ministry = await this.ministryModel
        .findById(id)
        .select('-__v')
        .lean();

      if (!ministry) {
        throw new BadRequestException({ message: 'Ministry not found' });
      }

      await this.redisCacheService.set(cacheKey, ministry, this.TTL);

      return {
        success: true,
        message: 'Ministry fetched successfully',
        data: ministry,
      };
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error;

      if (error.name === 'CastError') {
        throw new BadRequestException({ message: 'Invalid ministry ID' });
      }

      throw new InternalServerErrorException({
        message: 'Failed to fetch ministry',
      });
    }
  }

  // =========================
  // UPDATE (WITH IMAGE REPLACE)
  // =========================
  async update(
    id: string,
    dto: Partial<CreateMinistryDto>,
    file?: Express.Multer.File,
  ) {
    try {
      if (!id) {
        throw new BadRequestException({ message: 'Ministry ID is required' });
      }

      const existing = await this.ministryModel.findById(id);
      if (!existing) {
        throw new BadRequestException({ message: 'Ministry not found' });
      }

      // slug check
      if (dto.slug && dto.slug !== existing.slug) {
        const slugExists = await this.ministryModel
          .findOne({ slug: dto.slug })
          .lean();

        if (slugExists) {
          throw new ConflictException({
            message: 'Slug already exists',
            field: 'slug',
          });
        }
      }

      let newImage = existing.image;

      // ✅ If new image uploaded → replace old one
      if (file) {
        const uploaded = await this.cloudinaryService.uploadImage(file);

        if (existing.image?.publicId) {
          await this.cloudinaryService.deleteImage(existing.image.publicId);
        }

        newImage = uploaded;
      }

      const updateData: any = {
        ...dto,
        image: newImage,
      };

      if (dto.name) updateData.name = dto.name.trim();
      if (dto.slug) updateData.slug = dto.slug.trim();
      if (dto.leader) updateData.leader = dto.leader.trim();
      if (dto.description) updateData.description = dto.description.trim();
      if (dto.longDescription)
        updateData.longDescription = dto.longDescription.trim();

      const updated = await this.ministryModel
        .findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        })
        .select('-__v')
        .lean();

      await this.redisCacheService.set(
        this.getSingleKey(id),
        updated,
        this.TTL,
      );

      await this.invalidateListCache();

      return {
        success: true,
        message: 'Ministry updated successfully',
        data: updated,
      };
    } catch (error: any) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException({
        message: 'Failed to update ministry',
      });
    }
  }

  // =========================
  // DELETE (WITH IMAGE CLEANUP)
  // =========================
  async remove(id: string) {
    try {
      if (!id) {
        throw new BadRequestException({ message: 'Ministry ID is required' });
      }

      const deleted = await this.ministryModel.findByIdAndDelete(id).lean();

      if (!deleted) {
        throw new BadRequestException({ message: 'Ministry not found' });
      }

      // ✅ delete image from cloudinary
      if (deleted.image?.publicId) {
        await this.cloudinaryService.deleteImage(deleted.image.publicId);
      }

      await this.redisCacheService.del(this.getSingleKey(id));
      await this.invalidateListCache();

      return {
        success: true,
        message: 'Ministry deleted successfully',
        data: deleted,
      };
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException({
        message: 'Failed to delete ministry',
      });
    }
  }

  // =========================
  // CACHE INVALIDATION
  // =========================
  private async invalidateListCache() {
    try {
      const client = this.redisCacheService.getClient();
      const keys = await client.keys('ministries:page:*');

      if (keys.length) {
        await client.del(...keys);
      }
    } catch {
      console.error('Cache invalidation failed');
    }
  }
}