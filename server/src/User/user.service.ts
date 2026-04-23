import {
    Injectable,
    ConflictException,
    UnauthorizedException,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './user.schema';
import { RedisCacheService } from '@/src/redis-chache/redis-chache.service';
import { CreateUserDTO } from './user.dto';

export type SafeUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

type AuthSession = {
    tokenHash: string;
};

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly redis: RedisCacheService,
    ) { }





    // =========================
    // REGISTER (ADMIN ONLY SYSTEM SAFE)
    // =========================
    async createUser(dto: CreateUserDTO) {
        const email = dto.email.toLowerCase().trim();

        const exists = await this.userModel.exists({ email });
        if (exists) throw new ConflictException('Email already exists');

        const hashedPassword = await bcrypt.hash(dto.password, 12);

        const user = await this.userModel.create({
            name: dto.name.trim(),
            email,
            password: hashedPassword,
            role: 'admin', // ⚠ ONLY IF YOU WANT ADMIN ONLY SYSTEM
        });

        const safeUser = this.toSafe(user);

        return this.issueTokens(safeUser);
    }



    // =========================
    // LOGIN
    // =========================
    async loginUser(email: string, password: string) {
        const user = await this.userModel
            .findOne({ email: email.toLowerCase().trim() })
            .select('+password');

        if (!user) throw new UnauthorizedException({
            "statusCode": 401,
            "message": "Invalid email or password",
            "success": false
        });

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException({
            "statusCode": 401,
            "message": "Invalid email or password",
            "success": false
        });

        const safeUser = this.toSafe(user);

        return this.issueTokens(safeUser);
    }



    // =========================
    // REFRESH TOKEN (SECURE ROTATION)
    // =========================
    async refreshAccessToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const userId = payload.sub;

            const session = await this.redis.get<AuthSession>(`auth:session:${userId}`);

            if (!session) throw new UnauthorizedException('Session expired');

            const valid = await bcrypt.compare(refreshToken, session.tokenHash);

            if (!valid) throw new UnauthorizedException('Invalid refresh token');

            const user = await this.userModel.findById(userId);
            if (!user) throw new UnauthorizedException('User not found');

            const safeUser = this.toSafe(user);

            return this.issueTokens(safeUser);
        } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    // =========================
    // LOGOUT
    // =========================
    async logoutUser(userId: string) {
        await this.redis.del(`auth:session:${userId}`);
        return { message: 'Logged out' };
    }

    // =========================
    // ISSUE TOKENS (CORE LOGIC)
    // =========================
    private async issueTokens(user: SafeUser) {
        const accessToken = await this.jwtService.signAsync(
            { sub: user.id, role: user.role },
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            },
        );

        const refreshToken = await this.jwtService.signAsync(
            { sub: user.id },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            },
        );

        const tokenHash = await bcrypt.hash(refreshToken, 10);

        await this.redis.set(
            `auth:session:${user.id}`,
            { tokenHash },
            60 * 60 * 24 * 7,
        );

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    // =========================
    // SAFE USER
    // =========================
    private toSafe(user: any): SafeUser {
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}