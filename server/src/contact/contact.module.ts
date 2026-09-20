import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Contact, ContactSchema } from './contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
    ]),
    JwtModule.register({}),
    // ❌ RedisCacheModule removed — @Global() now
  ],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}