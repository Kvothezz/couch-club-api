import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtPayload, ValidatedUser } from './interfaces/auth.interfaces';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    private normalizeEmail(email: string): string {
        return email
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    async validateUser(email: string, pass: string): Promise<ValidatedUser | null> {
        const normalizedEmail = this.normalizeEmail(email);
        const user = await this.usersService.findOneByEmail(normalizedEmail);
        
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: ValidatedUser) {
        const payload: JwtPayload = { email: user.email, sub: user.id, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto) {
        const normalizedEmail = this.normalizeEmail(createUserDto.email);

        const existingUser = await this.usersService.findOneByEmail(normalizedEmail);
        if (existingUser) {
            throw new ConflictException('Este e-mail já está em uso');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.usersService.create({
            ...createUserDto,
            email: normalizedEmail,
            password: hashedPassword,
        });

        const { password, ...result } = user;
        return result;
    }
}
