import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    
    async validateUser(email:string, pass:string): Promise <any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))){
            const { password, ...result } = user; 
            return result
        }
        return null
    }

    async login(user:any){
        const payload = { email: user.email, sub: user.id, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async register(CreateUserDto: CreateUserDto){

        const existingUser = await this.usersService.findOneByEmail(CreateUserDto.email);
        if (existingUser) {
            throw new ConflictException('Este e-mail já está em uso');
        }
        
        const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
        const user = await this.usersService.create({
            ...CreateUserDto,
            password: hashedPassword,
        });

        const { password, ...result } = user;

    return result;
}   }
