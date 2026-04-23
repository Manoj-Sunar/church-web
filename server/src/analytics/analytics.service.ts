import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Sermons, SermonsDocument } from '@/src/sermons/sermons.schema';


import { RedisCacheService } from '@/src/redis-chache/redis-chache.service';
import { Member, MemberDocument } from '@/src/members/members.schema';
import { Ministry, MinistryDocument } from '@/src/ministry/ministy.schema';

@Injectable()
export class AnalyticsService {
  private readonly TTL = 60 * 30; // 30 min cache

  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,

    @InjectModel(Sermons.name)
    private readonly sermonModel: Model<SermonsDocument>,

    @InjectModel(Ministry.name)
    private readonly ministryModel: Model<MinistryDocument>,

    private readonly redis: RedisCacheService,
  ) { }

  private getKey() {
    return `dashboard:analytics`;
  }

  async getDashboardAnalytics() {
    try {
      // 🔥 1. CHECK CACHE
      const cacheKey = this.getKey();
      const cached = await this.redis.get(cacheKey);

      if (cached) return cached;

      const now = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(now.getMonth() - 1);

      const lastYear = new Date();
      lastYear.setFullYear(now.getFullYear() - 1);

      const quarterStart = new Date();
      quarterStart.setMonth(now.getMonth() - 3);

      // =========================
      // 📊 PARALLEL QUERIES
      // =========================
      const [
        totalMembers,
        lastMonthMembers,
        totalSermons,
        lastMonthSermons,
        totalMinistries,
        newMinistries,
      ] = await Promise.all([
        this.memberModel.countDocuments(),
        this.memberModel.countDocuments({
          join_date: { $gte: lastMonth },
        }),

        this.sermonModel.countDocuments(),
        this.sermonModel.countDocuments({
          createdAt: { $gte: lastMonth },
        }),

        this.ministryModel.countDocuments(),
        this.ministryModel.countDocuments({
          createdAt: { $gte: quarterStart },
        }),
      ]);

      // =========================
      // 📈 PERCENT CALCULATION
      // =========================
      const calcPercent = (current: number, prev: number) => {
        if (prev === 0) return 100;
        return (((current - prev) / prev) * 100).toFixed(1);
      };

      // =========================
      // 📉 MEMBER GROWTH (LINE)
      // =========================
      const memberGrowth = await this.memberModel.aggregate([
        {
          $group: {
            _id: {
              month: { $month: '$join_date' },
              year: { $year: '$join_date' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]);

      // =========================
      // 📊 SERMONS BAR CHART
      // =========================
      const sermonsBar = await this.sermonModel.aggregate([
        {
          $group: {
            _id: {
              month: { $month: '$date' },
            },
            count: { $sum: 1 },
          },
        },
      ]);

      // =========================
      // 🥧 MINISTRY PIE CHART
      // =========================
      const ministryPie = await this.ministryModel.aggregate([
        {
          $group: {
            _id: '$name',
            count: { $sum: 1 },
          },
        },
      ]);

      const result = {
        success: true,
        message: 'Dashboard analytics fetched',
        data: {
          cards: {
            totalMembers,
            membersGrowthPercent: calcPercent(
              totalMembers,
              lastMonthMembers,
            ),

            totalSermons,
            sermonsGrowthPercent: calcPercent(
              totalSermons,
              lastMonthSermons,
            ),

            activeMinistries: totalMinistries,
            newMinistriesQuarter: newMinistries,

            avgAttendanceGrowth: '+5%', // 👉 optional (you can replace with real data later)
          },

          charts: {
            memberGrowthLine: memberGrowth,
            sermonsBarChart: sermonsBar,
            ministryPieChart: ministryPie,
          },
        },
      };

      // =========================
      // ⚡ CACHE RESULT
      // =========================
      await this.redis.set(cacheKey, result, this.TTL);

      return result;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Failed to load analytics',
      });
    }
  }

  async getPublicTotals() {
    try {
      const cacheKey = 'public:totals';
      const cached = await this.redis.get(cacheKey);

      if (cached) return cached;

      const [totalMembers, totalSermons, totalMinistries] =
        await Promise.all([
          this.memberModel.countDocuments(),
          this.sermonModel.countDocuments(),
          this.ministryModel.countDocuments(),
        ]);

      const result = {
        totalMembers,
        totalSermons,
        totalMinistries,
      };

      await this.redis.set(cacheKey, result, this.TTL);

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to load public totals',
      );
    }
  }

}