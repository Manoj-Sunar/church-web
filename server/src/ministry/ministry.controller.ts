import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MinistryService } from './ministry.service';
import { JwtAuthGuard } from '@/src/guard/Auth.guard';
import { RolesGuard } from '@/src/guard/Authorization.guard';
import { Roles } from '@/src/decorator/roles.decorator';
import { UserRole } from '@/src/Enum/user-role.enum';
import { CreateMinistryDto } from './ministry.dto';
import { Public } from '@/src/decorator/public.decorator';

@Controller('ministry')
export class MinistryController {
    constructor(
        private readonly ministryService: MinistryService,
    ) { };


    // this route only for admin
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
    async CreateMinistry(@Body() body: CreateMinistryDto) {
        
        return this.ministryService.create(body);
    }


    // this is the public route unauthorized or not login user also can visit this route and get all datas
    @Public()
    @Get()
    async GellAllMinistry() {
        return this.ministryService.findAll();
    }

    // this is the public route unauthorized or not login user also can visit this route and get all datas
    @Public()
    @Get(":id")
    async GetMinistryById(@Param("id") id: string) {
        return this.ministryService.findById(id);
    }


    // this route is secure and only admin can use this route
    @Patch(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)

    async UpdateMinistryById(@Param("id") id: string, @Body() body: Partial<CreateMinistryDto>) {
        return this.ministryService.update(id, body);
    }


    // this route is secure and only admin can use this route
    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async DeleteMinistry(@Param("id") id: string) {
        return this.ministryService.remove(id);
    }

}
