import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { RedisCacheService } from "@/src/redis-chache/redis-chache.service";


import { Member, MemberDocument } from "./members.schema";
import { CreateMemberDto } from "./members.dto";
import { CloudinaryService } from "@/src/Cloudinary/cloudinary.service";

@Injectable()
export class MemberService {
  private readonly TTL = 60 * 60;
  private readonly DEFAULT_LIMIT = 10;

  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,
    private readonly redisCacheService: RedisCacheService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  // ================= CACHE KEYS =================
  private singleKey(id: string) {
    return `member:${id}`;
  }

  private listKey(page: number, limit: number) {
    return `members:page:${page}:limit:${limit}`;
  }

  // ================= CREATE =================
  async create(dto: CreateMemberDto) {
    try {
   

   
      const member = await this.memberModel.create({
        ...dto,
        name: dto.name.trim(),
        phone: dto.phone.trim(),
        image:dto.image,
      });

      const result = member.toObject();

      await this.redisCacheService.set(
        this.singleKey(result._id.toString()),
        result,
        this.TTL,
      );

      await this.invalidateListCache();

      return {
        success: true,
        message: "Member created successfully",
        data: result,
      };
    } catch {
      throw new InternalServerErrorException({
        message: "Failed to create member",
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
        this.memberModel
          .find()
          .sort({ join_date: -1 })
          .skip(skip)
          .limit(limit)
          .select("-__v")
          .lean(),
        this.memberModel.countDocuments(),
      ]);

      const result = {
        success: true,
        message: "Members fetched successfully",
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
        message: "Failed to fetch members",
      });
    }
  }

  // ================= UPDATE (WITH IMAGE REPLACE) =================
  async update(
    id: string,
    dto: Partial<CreateMemberDto>,
    file?: Express.Multer.File,
  ) {
    try {
      const existing = await this.memberModel.findById(id);

      if (!existing) {
        throw new BadRequestException({ message: "Member not found" });
      }

      let newImage = existing.image;

      // ✅ Replace image if new file uploaded
      if (file) {
        const uploaded = await this.cloudinaryService.uploadImage(
          file,
          "church/members",
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
      if (dto.phone) updateData.phone = dto.phone.trim();

      const updated = await this.memberModel
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
        message: "Member updated successfully",
        data: updated,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException({
        message: "Failed to update member",
      });
    }
  }

  // ================= DELETE (WITH IMAGE CLEANUP) =================
  async remove(id: string) {
    try {
      const deleted = await this.memberModel
        .findByIdAndDelete(id)
        .lean();

      if (!deleted) {
        throw new BadRequestException({ message: "Member not found" });
      }

      // ✅ delete Cloudinary image
      if (deleted.image?.publicId) {
        await this.cloudinaryService.deleteImage(
          deleted.image.publicId,
        );
      }

      await this.redisCacheService.del(this.singleKey(id));
      await this.invalidateListCache();

      return {
        success: true,
        message: "Member deleted successfully",
        data: deleted,
      };
    } catch {
      throw new InternalServerErrorException({
        message: "Failed to delete member",
      });
    }
  }

  // ================= CACHE INVALIDATION =================
  private async invalidateListCache() {
    try {
      const client = this.redisCacheService.getClient();
      const keys = await client.keys("members:page:*");

      if (keys.length) {
        await client.del(...keys);
      }
    } catch {
      console.error("Member cache invalidation failed");
    }
  }
}