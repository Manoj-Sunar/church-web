import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './Auth.guard';
import { RolesGuard } from './Authorization.guard';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    JwtAuthGuard,
    RolesGuard,
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useExisting: RolesGuard,
    },
  ],
  exports: [JwtAuthGuard, RolesGuard, JwtModule],
})
export class GuardModule {}