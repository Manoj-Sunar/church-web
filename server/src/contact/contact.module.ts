import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

import { MongooseModule, Schema } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Contact, ContactSchema } from './contact.schema';
import { RedisCacheModule } from '../redis-chache/redis-chache.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]), JwtModule.register({}),RedisCacheModule],
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule { }
