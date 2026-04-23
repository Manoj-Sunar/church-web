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


import { JwtAuthGuard } from "@/src/guard/Auth.guard";
import { RolesGuard } from "@/src/guard/Authorization.guard";
import { Roles } from "@/src/decorator/roles.decorator";
import { UserRole } from "@/src/Enum/user-role.enum";
import { MemberService } from "./members.service";
import { CreateMemberDto } from "./members.dto";

@Controller("members")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN) // 🔒 ALL ROUTES PROTECTED
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 🔒 CREATE
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() body: CreateMemberDto) {
    return this.memberService.create(body);
  }

  // 🔒 GET ALL
  @Get()
  getAll() {
    return this.memberService.findAll();
  }

  // 🔒 UPDATE
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: Partial<CreateMemberDto>) {
    return this.memberService.update(id, body);
  }

  // 🔒 DELETE
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.memberService.remove(id);
  }
}