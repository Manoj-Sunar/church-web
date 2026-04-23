import {
    Controller,
    Get,
    UseGuards,
} from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '@/src/guard/Auth.guard';
import { RolesGuard } from '@/src/guard/Authorization.guard';
import { Roles } from '@/src/decorator/roles.decorator';
import { UserRole } from '@/src/Enum/user-role.enum';
import { Public } from '@/src/decorator/public.decorator';

@Controller('admin/analytics')
export class AnalyticsController {
    constructor(
        private readonly analyticsService: AnalyticsService,
    ) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    async getDashboard() {
        return this.analyticsService.getDashboardAnalytics();
    }

    @Public()
    @Get("/public")
    async getPublicAnalytics() {
        return this.analyticsService.getPublicTotals();
    }
}