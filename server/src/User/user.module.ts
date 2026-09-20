import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({}),
    // ❌ RedisCacheModule removed — it's @Global() now
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}