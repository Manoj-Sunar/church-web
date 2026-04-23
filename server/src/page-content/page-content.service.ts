import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';
import {
  PageContent,
  PageContentDocument,
  PageName,
} from './page-content.schema';
import { UpdatePageContentDto } from './update.page-content.dto';
import { RedisCacheService } from '@/src/redis-chache/redis-chache.service';
import { CloudinaryService } from '@/src/Cloudinary/cloudinary.service';


@Injectable()
export class PageContentService {
  private readonly PAGE_CONTENT_TTL = 60 * 60;

  constructor(
    @InjectModel(PageContent.name)
    private readonly pageContentModel: Model<PageContentDocument>,
    private readonly redisCacheService: RedisCacheService,
    private readonly cloudinaryService: CloudinaryService, // ✅ ADD
  ) {}

  private getCacheKey(pageName: PageName): string {
    return `page-content:${pageName}`;
  }

  // =========================
  // GET (UNCHANGED)
  // =========================
  async getByPage(pageName: PageName) {
    const cacheKey = this.getCacheKey(pageName);

    const cached =
      await this.redisCacheService.get<PageContent>(cacheKey);

    if (cached) return cached;

    let page = await this.pageContentModel
      .findOne({ pageName })
      .lean();

    if (!page) {
      const created = await this.pageContentModel.create({
        pageName,
      });
      page = created.toObject();
    }

    await this.redisCacheService.set(
      cacheKey,
      page,
      this.PAGE_CONTENT_TTL,
    );

    return page;
  }



  // =========================
  // UPDATE (FIXED + CLOUDINARY SAFE)
  // =========================
  async updateByPage(
    pageName: PageName,
    dto: UpdatePageContentDto,
    adminUserId: string,
  ) {
    if (dto.pageName && dto.pageName !== pageName) {
      throw new BadRequestException(
        'Route pageName and body pageName must match.',
      );
    }

    // 🔥 STEP 1: GET EXISTING DATA
    const existing = await this.pageContentModel
      .findOne({ pageName })
      .lean();

    // =========================
    // 🔥 CLOUDINARY CLEANUP LOGIC
    // =========================

    // HERO IMAGE
    if (dto.hero?.image && existing?.hero?.image) {
      await this.cloudinaryService.replaceImage(
        existing.hero.image.publicId,
        dto.hero.image.publicId,
      );
    }

    // ABOUT IMAGE
    if (
      dto.about?.missionImage &&
      existing?.about?.missionImage
    ) {
      await this.cloudinaryService.replaceImage(
        existing.about.missionImage.publicId,
        dto.about.missionImage.publicId,
      );
    }

    // =========================
    // BUILD SAFE UPDATE
    // =========================
    const updateData = this.buildSafeUpdate(
      pageName,
      dto,
      adminUserId,
    );

    const updated = await this.pageContentModel
      .findOneAndUpdate(
        { pageName },
        { $set: updateData },
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      )
      .lean();

    // =========================
    // CACHE SYNC
    // =========================
    const cacheKey = this.getCacheKey(pageName);

    await this.redisCacheService.set(
      cacheKey,
      updated,
      this.PAGE_CONTENT_TTL,
    );

    return {
      success: true,
      message: 'page content updated successfully ☑️',
      data: updated,
    };
  }




  // =========================
  // SAFE UPDATE BUILDER
  // =========================
  private buildSafeUpdate(
    pageName: PageName,
    dto: UpdatePageContentDto,
    adminUserId: string,
  ): UpdateQuery<PageContent> {
    const update: Record<string, any> = {
      pageName,
      updatedBy: new Types.ObjectId(adminUserId),
    };

    if (dto.hero) {
      if (dto.hero.title !== undefined)
        update['hero.title'] = dto.hero.title.trim();

      if (dto.hero.subtitle !== undefined)
        update['hero.subtitle'] = dto.hero.subtitle.trim();

      if (dto.hero.image) {
        if (dto.hero.image.url !== undefined)
          update['hero.image.url'] = dto.hero.image.url.trim();

        if (dto.hero.image.publicId !== undefined)
          update['hero.image.publicId'] =
            dto.hero.image.publicId.trim();

        if (dto.hero.image.alt !== undefined)
          update['hero.image.alt'] = dto.hero.image.alt.trim();
      }
    }

    if (dto.main?.text !== undefined) {
      update['main.text'] = dto.main.text.trim();
    }

    if (dto.about) {
      if (dto.about.mission !== undefined) {
        update['about.mission'] = dto.about.mission.trim();
      }

      if (dto.about.missionImage) {
        if (dto.about.missionImage.url !== undefined)
          update['about.missionImage.url'] =
            dto.about.missionImage.url.trim();

        if (dto.about.missionImage.publicId !== undefined)
          update['about.missionImage.publicId'] =
            dto.about.missionImage.publicId.trim();

        if (dto.about.missionImage.alt !== undefined)
          update['about.missionImage.alt'] =
            dto.about.missionImage.alt.trim();
      }

      if (dto.about.missionContent !== undefined) {
        update['about.missionContent'] =
          dto.about.missionContent.map((item) => ({
            missionTitle: item.missionTitle?.trim() || '',
            missionDescription:
              item.missionDescription?.trim() || '',
          }));
      }
    }

    if (dto.contact) {
      if (dto.contact.email !== undefined)
        update['contact.email'] =
          dto.contact.email.trim().toLowerCase();

      if (dto.contact.phone !== undefined)
        update['contact.phone'] = dto.contact.phone.trim();

      if (dto.contact.address !== undefined)
        update['contact.address'] =
          dto.contact.address.trim();
    }

    if (dto.donate?.bankInfo !== undefined) {
      update['donate.bankInfo'] =
        dto.donate.bankInfo.trim();
    }

    return update;
  }


  
}