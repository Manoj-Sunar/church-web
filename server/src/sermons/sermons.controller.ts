import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Param,

  Delete,
  Patch,
} from '@nestjs/common';
import { SermonsService } from './sermons.service';
import { CreateSermonDto } from './createSermon.dto';
import { JwtAuthGuard } from '@/src/guard/Auth.guard';
import { RolesGuard } from '@/src/guard/Authorization.guard';
import { Roles } from '@/src/decorator/roles.decorator';
import { UserRole } from '@/src/Enum/user-role.enum';
import { Public } from '@/src/decorator/public.decorator';

@Controller('sermons')
export class SermonsController {
  constructor(
    private readonly sermonService: SermonsService,
  ) { }




  // =========================
  // 🚀 CREATE SERMON (ADMIN ONLY)
  // =========================
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
    }),
  )
  async createSermonByAdmin(
    @Body() dto: CreateSermonDto,
  ) {
    console.log(dto);
    return this.sermonService.createSermon(dto);
  }




  // =========================
  // 📥 GET ALL SERMONS (LOAD MORE)
  // =========================
  @Public()
  @Get()
  async getSermons(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.sermonService.getSermons(
      Number(page),
      Number(limit),
    );
  }



  // this route for all 
  @Public()
  @Get("/sermon-details/:id")
  async GetSermonById(@Param("id") id: string) {

    return this.sermonService.getSermonById(id);
  }




  @Patch("/sermon-update/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async UpdateSermon(@Param('id') id: string,
    @Body() dto: Partial<CreateSermonDto>) {
      console.log(id);
    this.sermonService.UpdateSermonById(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async DeleteSermon(@Param('id') id: string) {
    this.sermonService.DeleteSermonById(id);
  }

}