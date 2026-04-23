import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";

import { LeaderService } from "./leader.service";
import { CreateLeaderDto } from "./leader.dto";
import { JwtAuthGuard } from "@/src/guard/Auth.guard";
import { RolesGuard } from "@/src/guard/Authorization.guard";
import { Roles } from "@/src/decorator/roles.decorator";
import { UserRole } from "@/src/Enum/user-role.enum";
import { Public } from "@/src/decorator/public.decorator";

@Controller("leaders")
export class LeaderController {
    constructor(private readonly leaderService: LeaderService) { }

    // 🔒 ADMIN CREATE
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() body: CreateLeaderDto) {
        return this.leaderService.create(body);
    }

    // 🌍 PUBLIC GET ALL
    @Public()
    @Get()
    getAll() {
        return this.leaderService.findAll();
    }

    // 🌍 PUBLIC GET ONE
    @Public()
    @Get(":id")
    getOne(@Param("id") id: string) {
        return this.leaderService.findById(id);
    }

    // 🔒 ADMIN UPDATE
    @Patch(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    update(@Param("id") id: string, @Body() body: Partial<CreateLeaderDto>) {
        return this.leaderService.update(id, body);
    }

    // 🔒 ADMIN DELETE
    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    remove(@Param("id") id: string) {
        return this.leaderService.remove(id);
    }
}