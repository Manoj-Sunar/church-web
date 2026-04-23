import {
    Injectable,
    InternalServerErrorException,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from './contact.schema';
import { Model } from 'mongoose';
import { RedisCacheService } from '@/src/redis-chache/redis-chache.service';
import { CreateContactDto } from './contact.dto';

@Injectable()
export class ContactService {
    private readonly TTL = 60 * 60;
    private readonly DEFAULT_LIMIT = 10;

    constructor(
        @InjectModel(Contact.name)
        private readonly contactModel: Model<ContactDocument>,
        private readonly redisService: RedisCacheService,
    ) { }

    // ================= CACHE KEYS =================
    private singleKey(id: string) {
        return `contact:${id}`;
    }

    private listKey(page: number, limit: number) {
        return `contact:page:${page}:limit:${limit}`;
    }




    // ================= SEND MESSAGE =================
    async sendMessage(dto: CreateContactDto) {
        try {
            const message = await this.contactModel.create({
                name: dto.name.trim(),
                email: dto.email.trim().toLowerCase(),
                subject: dto.subject.trim(),
                messages: dto.messages.trim(),
            });

            const result = message.toObject();

            // cache single message
            await this.redisService.set(
                this.singleKey(result._id.toString()),
                result,
                this.TTL,
            );

            // clear list cache
            await this.invalidateListCache();

            return {
                success: true,
                message: 'Message sent successfully',
                data: result,
            };
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Failed to send message',
            });
        }
    }




    // ================= GET ALL (ADMIN USE) =================
    async findAll(page = 1, limit = this.DEFAULT_LIMIT) {
        try {
            page = Math.max(1, Number(page));
            limit = Math.min(50, Number(limit));

            const cacheKey = this.listKey(page, limit);
            const cached = await this.redisService.get(cacheKey);

            if (cached) return cached;

            const skip = (page - 1) * limit;

            const [data, total] = await Promise.all([
                this.contactModel
                    .find()
                    .sort({ createdAt: -1 }) // latest first
                    .skip(skip)
                    .limit(limit)
                    .select('-__v')
                    .lean(),
                this.contactModel.countDocuments(),
            ]);

            const result = {
                success: true,
                message: 'Messages fetched successfully',
                data,
                pagination: {
                    total,
                    page,
                    limit,
                    hasMore: skip + data.length < total,
                },
            };

            await this.redisService.set(cacheKey, result, this.TTL);

            return result;
        } catch {
            throw new InternalServerErrorException({
                message: 'Failed to fetch messages',
            });
        }
    }




    // ================= DELETE MESSAGE (ADMIN ONLY) =================
    async deleteMessage(id: string) {
        try {
            if (!id) {
                throw new BadRequestException({
                    message: 'Message ID is required',
                });
            }

            const deleted = await this.contactModel
                .findByIdAndDelete(id)
                .lean();

            if (!deleted) {
                throw new NotFoundException({
                    message: 'Message not found',
                });
            }

            // delete cache
            await this.redisService.del(this.singleKey(id));

            // clear list cache
            await this.invalidateListCache();

            return {
                success: true,
                message: 'Message deleted successfully',
                data: deleted,
            };
        } catch (error: any) {
            if (
                error instanceof BadRequestException ||
                error instanceof NotFoundException
            ) {
                throw error;
            }

            throw new InternalServerErrorException({
                message: 'Failed to delete message',
            });
        }
    }




    // ================= CACHE INVALIDATION =================
    private async invalidateListCache() {
        const client = this.redisService.getClient();
        const keys = await client.keys('contact:page:*');

        if (keys.length) {
            await client.del(...keys);
        }
    }
}