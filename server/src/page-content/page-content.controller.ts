import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PageContentService } from './page-content.service';
import { PageName } from './page-content.schema';
import { JwtAuthGuard } from '@/src/guard/Auth.guard';
import { RolesGuard } from '@/src/guard/Authorization.guard';
import { Roles } from '@/src/decorator/roles.decorator';
import { UserRole } from '@/src/Enum/user-role.enum';
import { UpdatePageContentDto } from './update.page-content.dto';
import { Public } from '@/src/decorator/public.decorator';


@Controller('/page-content')
export class PageContentController {
  constructor(private readonly pageContentService: PageContentService) { }

  @Public()
  @Get(':pageName')
  async getPageContent(@Param('pageName') pageName: PageName) {
    const data = await this.pageContentService.getByPage(pageName);

    return {
      success: true,
      message: "page content fetched successfully",
      data,
    };
  }




  @Patch('/admin/:pageName')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updatePageContent(
    @Param('pageName') pageName: PageName,
    @Body() dto: UpdatePageContentDto,
    @Req() req: any,
  ) {

    return this.pageContentService.updateByPage(pageName, dto, req.user.userId);
  }
}