import { Module } from '@nestjs/common';
import { SermonsService } from './sermons.service';
import { SermonsController } from './sermons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sermons, SermonsSchema } from './sermons.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sermons.name, schema: SermonsSchema },
    ]),
    JwtModule.register({}),
    // ❌ RedisCacheModule removed — @Global() now
  ],
  providers: [SermonsService],
  controllers: [SermonsController],
})
export class SermonsModule {}