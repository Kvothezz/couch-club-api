import { NotFoundException, Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtPayload, ValidatedUser } from './interfaces/auth.interfaces';
import { ChangePasswordDto } from './dtos/changePasswordDto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    FRONT_URL = process.env.FRONT_URL || 'http://localhost:5173';

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
            throw new ConflictException('this email is already registered');
        }

        const user = await this.usersService.create({
            ...createUserDto,
            email: normalizedEmail,
        });

        const { password, ...result } = user;
        return result;
    }

    async changePassword(userId:string , newPassword: string, oldPassword: string) {
        
        if (oldPassword === newPassword) {
            throw new BadRequestException('The new password must be different from the old password');
        }
        
        const user =  await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        } 

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        
        if (!isOldPasswordValid) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        await this.usersService.update(userId, { password: newPassword });
        return { message: 'Password changed successfully' };

    }

    async forgotPassword(email : string) {
        const normalizedEmail = this.normalizeEmail(email);
        const existingUser = await this.usersService.findOneByEmail(normalizedEmail);

           if (!existingUser) {
               return {message:"If that email is registered, you will receive a password within a few minutes"};
            }
        
        const payload = {sub: existingUser.id , purpose: 'reset-password'};
        const resetToken = this.jwtService.sign(payload, { expiresIn: '15m' });

        const resetLink = `${this.FRONT_URL}/reset-password?token=${resetToken}`;

        console.log('\n=========================================');
        console.log(`✉️ [EMAIL SIMULADO] Para: ${existingUser.email}`);
        console.log(`✉️ [EMAIL SIMULADO] Assunto: Couch Club - Recuperação de Senha`);
        console.log(`✉️ [EMAIL SIMULADO] Link: ${resetLink}`);
        console.log('=========================================\n');

        return {message:"If that email is registered, you will receive a password within a few minutes"};

    }

}
