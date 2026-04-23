import { UserRole } from "@/src/Enum/user-role.enum";

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}