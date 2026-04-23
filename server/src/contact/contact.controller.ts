import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './contact.dto';
import { Public } from '@/src/decorator/public.decorator';
import { JwtAuthGuard } from '@/src/guard/Auth.guard';
import { RolesGuard } from '@/src/guard/Authorization.guard';
import { Roles } from '@/src/decorator/roles.decorator';
import { UserRole } from '@/src/Enum/user-role.enum';

@Controller('contact')
export class ContactController {

    constructor(private readonly contactService: ContactService) { }

    @Public()
    @Post()
    async SendMessage(@Body() body: CreateContactDto) {
        return this.contactService.sendMessage(body);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async GetAllMessages() {
        return this.contactService.findAll();
    }



    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async DeleteMessages(@Param("id") id: string) {
        return this.contactService.deleteMessage(id);
    }

}
