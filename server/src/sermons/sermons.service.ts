import {
  Injectable,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sermons, SermonsDocument } from './sermons.schema';
import { Model } from 'mongoose';
import { RedisCacheService } from '@/src/redis-chache/redis-chache.service';
import { CreateSermonDto } from './createSermon.dto';

@Injectable()
export class SermonsService {
  private readonly SERMON_TTL = 60 * 60; // 1 hour
  private readonly DEFAULT_LIMIT = 10;

  constructor(
    @InjectModel(Sermons.name)
    private readonly sermonsModel: Model<SermonsDocument>,
    private readonly redisCacheService: RedisCacheService,
  ) { }




  // =========================
  // 🔑 CACHE KEYS
  // =========================
  private getSingleKey(id: string): string {
    return `sermon:${id}`;
  }


  

  private getListKey(page: number, limit: number): string {
    return `sermons:page:${page}:limit:${limit}`;
  }





  // =========================
  // 🚀 CREATE SERMON
  // =========================
  async createSermon(dto: CreateSermonDto) {
    try {
      const { title, slug, speaker, date, videoUrl, description } = dto;

      // ❗ duplicate slug check
      const existing = await this.sermonsModel
        .findOne({ slug })
        .lean();

      if (existing) {
        throw new ConflictException({
          message: 'Slug already exists',
          field: 'slug',
        });
      }

      // ✅ create sermon
      const sermon = await this.sermonsModel.create({
        title: title.trim(),
        slug: slug.trim(),
        speaker: speaker.trim(),
        videoUrl: videoUrl.trim(),
        description: description.trim(),
        date: new Date(date),
      });



      const result = sermon.toObject();



      // ✅ cache single sermon
      await this.redisCacheService.set(
        this.getSingleKey(result._id.toString()),
        result,
        this.SERMON_TTL,
      );



      // ❗ invalidate list cache
      await this.invalidateListCache();

      return {
        success: true,
        message: 'Sermon created successfully',
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


      if (error.name === 'ValidationError') {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: Object.values(error.errors).map(
            (err: any) => ({
              field: err.path,
              message: err.message,
            }),
          ),
        });
      }



      throw new InternalServerErrorException({
        message:
          'Something went wrong while creating sermon',
      });


    }
  }



  // =========================
  // 📥 GET SERMONS (LOAD MORE + CACHE)
  // =========================

  async getSermons(
    page = 1,
    limit = this.DEFAULT_LIMIT,
  ) {

    try {

      page = Math.max(1, Number(page));
      limit = Math.min(50, Number(limit));

      const cacheKey = this.getListKey(page, limit);

      // ✅ check cache
      const cached =
        await this.redisCacheService.get(cacheKey);

      if (cached) {
        return cached;
      }

      const skip = (page - 1) * limit;

      // ✅ DB query
      const [data, total] = await Promise.all([
        this.sermonsModel
          .find()
          .sort({ date: -1 })
          .skip(skip)
          .limit(limit)
          .select('-__v')
          .lean(),
        this.sermonsModel.countDocuments(),
      ]);

      const result = {
        success: true,
        message: 'Sermons fetched successfully',
        data,
        pagination: {
          total,
          page,
          limit,
          hasMore: skip + data.length < total,
        },
      };



      // ✅ cache result
      await this.redisCacheService.set(
        cacheKey,
        result,
        this.SERMON_TTL,
      );

      return result;

    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Failed to fetch sermons',
      });
    }
  }



  async getSermonById(id: string) {
    try {
      // ✅ validate id
      if (!id) {
        throw new BadRequestException({
          message: 'Sermon ID is required',
        });
      }

      const cacheKey = this.getSingleKey(id);


      // =========================
      // 🔥 1. CHECK CACHE
      // =========================
      const cached = await this.redisCacheService.get(cacheKey);



      if (cached) {
        return {
          success: true,
          message: 'Sermon fetched from cache',
          data: cached,
        };
      }

      // =========================
      // 🗄️ 2. FETCH FROM DB
      // =========================
      const sermon = await this.sermonsModel
        .findById(id)
        .select('-__v')
        .lean();





      // ❗ Not found
      if (!sermon) {
        throw new BadRequestException({
          message: 'Sermon not found',
        });
      }

      // =========================
      // ⚡ 3. CACHE RESULT
      // =========================
      await this.redisCacheService.set(
        cacheKey,
        sermon,
        this.SERMON_TTL,
      );

      // =========================
      // ✅ 4. RETURN RESPONSE
      // =========================
      return {
        success: true,
        message: 'Sermon fetched successfully',
        data: sermon,
      };

    } catch (error: any) {
      // 🔁 preserve known errors
      if (
        error instanceof BadRequestException
      ) {
        throw error;
      }

      // ❌ invalid ObjectId (Mongo error fix)
      if (error.name === 'CastError') {
        throw new BadRequestException({
          message: 'Invalid sermon ID',
        });
      }

      // ❌ fallback error
      throw new InternalServerErrorException({
        message: 'Failed to fetch sermon',
      });
    }
  }




async DeleteSermonById(id: string) {
  try {
    if (!id) {
      throw new BadRequestException({
        message: 'Sermon ID is required',
      });
    }

    const cacheKey = this.getSingleKey(id);

    // ✅ Delete from DB
    const deleted = await this.sermonsModel.findByIdAndDelete(id).lean();

    if (!deleted) {
      throw new BadRequestException({
        message: 'Sermon not found',
      });
    }

    // =========================
    // 🧹 CACHE CLEANUP
    // =========================

    // ❌ Remove single cache
    await this.redisCacheService.del(cacheKey);

    // ❌ Invalidate list cache
    await this.invalidateListCache();

    return {
      success: true,
      message: 'Sermon deleted successfully',
      data: deleted,
    };

  } catch (error: any) {
    if (error instanceof BadRequestException) throw error;

    if (error.name === 'CastError') {
      throw new BadRequestException({
        message: 'Invalid sermon ID',
      });
    }

    throw new InternalServerErrorException({
      message: 'Failed to delete sermon',
    });
  }
}



async UpdateSermonById(
  id: string,
  dto: Partial<CreateSermonDto>,
) {
  try {
    if (!id) {
      throw new BadRequestException({
        message: 'Sermon ID is required',
      });
    }

    const cacheKey = this.getSingleKey(id);

    // =========================
    // 🔍 CHECK EXISTING SERMON
    // =========================
    const existing = await this.sermonsModel.findById(id);

    if (!existing) {
      throw new BadRequestException({
        message: 'Sermon not found',
      });
    }

    // =========================
    // ❗ CHECK DUPLICATE SLUG
    // =========================
    if (dto.slug && dto.slug !== existing.slug) {
      const slugExists = await this.sermonsModel
        .findOne({ slug: dto.slug })
        .lean();

      if (slugExists) {
        throw new ConflictException({
          message: 'Slug already exists',
          field: 'slug',
        });
      }
    }

    // =========================
    // ✏️ PREPARE UPDATE DATA
    // =========================
    const updateData: any = {};

    if (dto.title) updateData.title = dto.title.trim();
    if (dto.slug) updateData.slug = dto.slug.trim();
    if (dto.speaker) updateData.speaker = dto.speaker.trim();
    if (dto.videoUrl) updateData.videoUrl = dto.videoUrl.trim();
    if (dto.description) updateData.description = dto.description.trim();
    if (dto.date) updateData.date = new Date(dto.date);

    // =========================
    // 🚀 UPDATE DB
    // =========================
    const updated = await this.sermonsModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      })
      .select('-__v')
      .lean();

    // =========================
    // ⚡ UPDATE CACHE
    // =========================
    await this.redisCacheService.set(
      cacheKey,
      updated,
      this.SERMON_TTL,
    );

    // ❗ invalidate list cache
    await this.invalidateListCache();

    return {
      success: true,
      message: 'Sermon updated successfully',
      data: updated,
    };

  } catch (error: any) {
    if (
      error instanceof BadRequestException ||
      error instanceof ConflictException
    ) {
      throw error;
    }

    if (error.name === 'CastError') {
      throw new BadRequestException({
        message: 'Invalid sermon ID',
      });
    }

    if (error.code === 11000) {
      throw new ConflictException({
        message: 'Duplicate field value',
        field: Object.keys(error.keyValue)[0],
      });
    }

    if (error.name === 'ValidationError') {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: Object.values(error.errors).map(
          (err: any) => ({
            field: err.path,
            message: err.message,
          }),
        ),
      });
    }

    throw new InternalServerErrorException({
      message: 'Failed to update sermon',
    });
  }
}






  // =========================
  // 🧹 CACHE INVALIDATION
  // =========================
  private async invalidateListCache() {
    try {
      const client =
        this.redisCacheService.getClient();

      const keys = await client.keys(
        'sermons:page:*',
      );

      if (keys.length) {
        await client.del(...keys);
      }
    } catch (error) {
      console.error(
        'Cache invalidation failed',
      );
    }
  }
}