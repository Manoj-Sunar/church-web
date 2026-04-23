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

import { EventService } from "./event.service";
import { CreateEventDto } from "./event.dto";
import { JwtAuthGuard } from "@/src/guard/Auth.guard";
import { RolesGuard } from "@/src/guard/Authorization.guard";
import { Roles } from "@/src/decorator/roles.decorator";
import { UserRole } from "@/src/Enum/user-role.enum";
import { Public } from "@/src/decorator/public.decorator";

@Controller("events")
export class EventController {
    constructor(private readonly eventService: EventService) { }

    // 🔒 ADMIN CREATE
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
        })
    )
    create(@Body() body: CreateEventDto) {
        return this.eventService.create(body);
    }

    // 🌍 PUBLIC GET ALL
    @Public()
    @Get()
    getAll() {
        return this.eventService.findAll();
    }

    // 🌍 PUBLIC GET ONE
    @Public()
    @Get(":id")
    getOne(@Param("id") id: string) {
        return this.eventService.findById(id);
    }

    // 🔒 ADMIN UPDATE
    @Patch(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    update(@Param("id") id: string, @Body() body: Partial<CreateEventDto>) {
        return this.eventService.update(id, body);
    }

    // 🔒 ADMIN DELETE
    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    remove(@Param("id") id: string) {
        return this.eventService.remove(id);
    }
}