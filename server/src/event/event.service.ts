import {
    Injectable,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Event, EventDocument } from "./event.schema";
import { CreateEventDto } from "./event.dto";
import { RedisCacheService } from "@/src/redis-chache/redis-chache.service";
import { CloudinaryService } from "@/src/Cloudinary/cloudinary.service";


@Injectable()
export class EventService {
    private readonly TTL = 60 * 60;
    private readonly DEFAULT_LIMIT = 10;

    constructor(
        @InjectModel(Event.name)
        private readonly eventModel: Model<EventDocument>,
        private readonly redisCacheService: RedisCacheService,
        private readonly cloudinaryService: CloudinaryService, // ✅ ADD
    ) { }

    // ================= CACHE KEYS =================
    private singleKey(id: string) {
        return `event:${id}`;
    }

    private listKey(page: number, limit: number) {
        return `events:page:${page}:limit:${limit}`;
    }

    // ================= CREATE =================
    async create(dto: CreateEventDto) {
        try {
         
            const slug = dto.slug.trim().toLowerCase();

            const exists = await this.eventModel.findOne({ slug }).lean();
            if (exists) {
                throw new ConflictException({
                    message: "Slug already exists",
                    field: "slug",
                });
            }


           

            const event = await this.eventModel.create({
                ...dto,
                slug,
                title: dto.title.trim(),
                location: dto.location.trim(),
                description: dto.description.trim(),
            });

            const result = event.toObject();

            await this.redisCacheService.set(
                this.singleKey(result._id.toString()),
                result,
                this.TTL,
            );

            await this.invalidateListCache();

            return {
                success: true,
                message: "Event created successfully",
                data: result,
            };
        } catch (error: any) {
            if (error instanceof ConflictException) throw error;

            if (error.code === 11000) {
                throw new ConflictException({
                    message: "Duplicate field value",
                    field: Object.keys(error.keyValue)[0],
                });
            }

            throw new InternalServerErrorException({
                message: "Failed to create event",
            });
            
            console.log(error)
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
                this.eventModel
                    .find()
                    .sort({ date: 1 })
                    .skip(skip)
                    .limit(limit)
                    .select("-__v")
                    .lean(),
                this.eventModel.countDocuments(),
            ]);

            const result = {
                success: true,
                message: "Events fetched successfully",
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
                message: "Failed to fetch events",
            });
        }
    }

    // ================= GET ONE =================
    async findById(id: string) {
        try {
            if (!id) {
                throw new BadRequestException({ message: "Event ID required" });
            }

            const cacheKey = this.singleKey(id);
            const cached = await this.redisCacheService.get(cacheKey);

            if (cached) {
                return {
                    success: true,
                    message: "Event fetched from cache",
                    data: cached,
                };
            }

            const event = await this.eventModel
                .findById(id)
                .select("-__v")
                .lean();

            if (!event) {
                throw new BadRequestException({ message: "Event not found" });
            }

            await this.redisCacheService.set(cacheKey, event, this.TTL);

            return {
                success: true,
                message: "Event fetched successfully",
                data: event,
            };
        } catch (error: any) {
            if (error instanceof BadRequestException) throw error;

            if (error.name === "CastError") {
                throw new BadRequestException({ message: "Invalid event ID" });
            }

            throw new InternalServerErrorException({
                message: "Failed to fetch event",
            });
        }
    }

    // ================= UPDATE (🔥 FIXED CLOUDINARY) =================
    async update(id: string, dto: Partial<CreateEventDto>) {
        try {
            const existing = await this.eventModel.findById(id);

            if (!existing) {
                throw new BadRequestException({ message: "Event not found" });
            }

            // ================= SLUG CHECK =================
            if (dto.slug && dto.slug !== existing.slug) {
                const slugExists = await this.eventModel
                    .findOne({ slug: dto.slug })
                    .lean();

                if (slugExists) {
                    throw new ConflictException({
                        message: "Slug already exists",
                    });
                }
            }

            // ================= CLOUDINARY CLEANUP =================
            if (dto.image && existing.image?.publicId) {
                await this.cloudinaryService.replaceImage(
                    existing.image.publicId,
                    dto.image.publicId,
                );
            }

            // ================= UPDATE DB =================
            const updated = await this.eventModel
                .findByIdAndUpdate(
                    id,
                    {
                        ...dto,
                    },
                    { new: true, runValidators: true },
                )
                .select("-__v")
                .lean();

            // ================= CACHE =================
            await this.redisCacheService.set(
                this.singleKey(id),
                updated,
                this.TTL,
            );

            await this.invalidateListCache();

            return {
                success: true,
                message: "Event updated successfully",
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
                message: "Failed to update event",
            });
        }
    }

    // ================= DELETE (🔥 FIXED CLOUDINARY) =================
    async remove(id: string) {
        try {
            const existing = await this.eventModel.findById(id);

            if (!existing) {
                throw new BadRequestException({ message: "Event not found" });
            }

            // ================= CLOUDINARY CLEANUP =================
            if (existing.image?.publicId) {
                await this.cloudinaryService.deleteImage(
                    existing.image.publicId,
                );
            }

            const deleted = await this.eventModel
                .findByIdAndDelete(id)
                .lean();

            await this.redisCacheService.del(this.singleKey(id));
            await this.invalidateListCache();

            return {
                success: true,
                message: "Event deleted successfully",
                data: deleted,
            };
        } catch (error) {
            throw new InternalServerErrorException({
                message: "Failed to delete event",
            });
        }
    }

    // ================= CACHE INVALIDATION =================
    private async invalidateListCache() {
        const client = this.redisCacheService.getClient();
        const keys = await client.keys("events:page:*");

        if (keys.length) {
            await client.del(...keys);
        }
    }
}