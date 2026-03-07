import { Controller, Post,  Put, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ChangePasswordDto } from './dtos/changePasswordDto';
import { LoginDto } from './dtos/loginDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto:LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
    return this.authService.changePassword(
      req.user.id, 
      changePasswordDto.newPassword,
      changePasswordDto.oldPassword
    );
  }

  @Post('forgotPassword')
    async forgotPassword(@Body() email: string) {
      return this.authService.forgotPassword(email); 
    }
}