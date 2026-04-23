import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '@/src/decorator/roles.decorator';
import { UserRole } from '@/src/Enum/user-role.enum';
import { JwtPayload } from '@/src/interface/jwt-payload.interface';
import { IS_PUBLIC_KEY } from '@/src/decorator/public.decorator';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    const requiredRoles =
      this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];

    if (requiredRoles.length === 0) {
      return true;
    }

    if (!user) {
      throw new UnauthorizedException(
        'User not authenticated. Ensure JwtAuthGuard runs before RolesGuard.',
      );
    }

    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      this.logger.warn(
        `Access denied — userId: ${user.sub}, role: "${user.role}", required: [${requiredRoles.join(', ')}]`,
      );

      throw new ForbiddenException(
        `Access denied. Required role(s): ${requiredRoles.join(', ')}.`,
      );
    }

    return true;
  }
}