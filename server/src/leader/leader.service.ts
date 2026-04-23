import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Leader, LeaderDocument } from "./leader.schema";
import { CreateLeaderDto } from "./leader.dto";
import { RedisCacheService } from "@/src/redis-chache/redis-chache.service";
import { CloudinaryService } from "@/src/Cloudinary/cloudinary.service";



@Injectable()
export class LeaderService {
  private readonly TTL = 60 * 60;
  private readonly DEFAULT_LIMIT = 10;

  constructor(
    @InjectModel(Leader.name)
    private readonly leaderModel: Model<LeaderDocument>,
    private readonly redisCacheService: RedisCacheService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  // ================= CACHE KEYS =================
  private singleKey(id: string) {
    return `leader:${id}`;
  }

  private listKey(page: number, limit: number) {
    return `leaders:page:${page}:limit:${limit}`;
  }

  // ================= CREATE =================
  async create(dto: CreateLeaderDto) {
    try {
     
      const leader = await this.leaderModel.create({
        ...dto,
        name: dto.name.trim(),
        role: dto.role.trim(),
        bio: dto.bio.trim(),
        image:dto.image,
      });

      const result = leader.toObject();

      await this.redisCacheService.set(
        this.singleKey(result._id.toString()),
        result,
        this.TTL,
      );

      await this.invalidateListCache();

      return {
        success: true,
        message: "Leader created successfully",
        data: result,
      };
    } catch {
      throw new InternalServerErrorException({
        message: "Failed to create leader",
      });
    }
  }

  // ================= GET ALL =================
  async findAll(page = 1, limit = this.DEFAULT_LIMIT) {
    try {
      page = Math.max(1, Number(page));
      limit = Math.min(50, Number(limit));

      const cacheKey = this.listKey(page, limit);
      const cached = await this.redisCacheService.get(cacheKey);

      if (cached) return cached;

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.leaderModel
          .find()
          .sort({ order_index: 1 })
          .skip(skip)
          .limit(limit)
          .select("-__v")
          .lean(),
        this.leaderModel.countDocuments(),
      ]);

      const result = {
        success: true,
        message: "Leaders fetched successfully",
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
        message: "Failed to fetch leaders",
      });
    }
  }

  // ================= GET ONE =================
  async findById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException({ message: "Leader ID required" });
      }

      const cacheKey = this.singleKey(id);
      const cached = await this.redisCacheService.get(cacheKey);

      if (cached) {
        return {
          success: true,
          message: "Leader fetched from cache",
          data: cached,
        };
      }

      const leader = await this.leaderModel
        .findById(id)
        .select("-__v")
        .lean();

      if (!leader) {
        throw new BadRequestException({ message: "Leader not found" });
      }

      await this.redisCacheService.set(cacheKey, leader, this.TTL);

      return {
        success: true,
        message: "Leader fetched successfully",
        data: leader,
      };
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error;

      if (error.name === "CastError") {
        throw new BadRequestException({ message: "Invalid leader ID" });
      }

      throw new InternalServerErrorException({
        message: "Failed to fetch leader",
      });
    }
  }

  // ================= UPDATE (WITH IMAGE REPLACE) =================
  async update(
    id: string,
    dto: Partial<CreateLeaderDto>,
    file?: Express.Multer.File,
  ) {
    try {
      const existing = await this.leaderModel.findById(id);

      if (!existing) {
        throw new BadRequestException({ message: "Leader not found" });
      }

      let newImage = existing.image;

      // ✅ If new image uploaded → replace old image
      if (file) {
        const uploaded = await this.cloudinaryService.uploadImage(
          file,
          "church/leaders",
        );

        if (existing.image?.publicId) {
          await this.cloudinaryService.deleteImage(
            existing.image.publicId,
          );
        }

        newImage = uploaded;
      }

      const updateData: any = {
        ...dto,
        image: newImage,
      };

      if (dto.name) updateData.name = dto.name.trim();
      if (dto.role) updateData.role = dto.role.trim();
      if (dto.bio) updateData.bio = dto.bio.trim();

      const updated = await this.leaderModel
        .findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        })
        .select("-__v")
        .lean();

      await this.redisCacheService.set(
        this.singleKey(id),
        updated,
        this.TTL,
      );

      await this.invalidateListCache();

      return {
        success: true,
        message: "Leader updated successfully",
        data: updated,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException({
        message: "Failed to update leader",
      });
    }
  }

  // ================= DELETE (WITH IMAGE CLEANUP) =================
  async remove(id: string) {
    try {
      const deleted = await this.leaderModel
        .findByIdAndDelete(id)
        .lean();

      if (!deleted) {
        throw new BadRequestException({ message: "Leader not found" });
      }

      // ✅ delete image from cloudinary
      if (deleted.image?.publicId) {
        await this.cloudinaryService.deleteImage(
          deleted.image.publicId,
        );
      }

      await this.redisCacheService.del(this.singleKey(id));
      await this.invalidateListCache();

      return {
        success: true,
        message: "Leader deleted successfully",
        data: deleted,
      };
    } catch {
      throw new InternalServerErrorException({
        message: "Failed to delete leader",
      });
    }
  }

  // ================= CACHE INVALIDATION =================
  private async invalidateListCache() {
    try {
      const client = this.redisCacheService.getClient();
      const keys = await client.keys("leaders:page:*");

      if (keys.length) {
        await client.del(...keys);
      }
    } catch {
      console.error("Leader cache invalidation failed");
    }
  }
}