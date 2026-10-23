import { Controller, Post, Put, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ChangePasswordDto } from './dtos/changePasswordDto';
import { LoginDto } from './dtos/loginDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ForgotPasswordDto } from './dtos/forgotPasswordDto';
import { ResetPasswordDto } from './dtos/resetPasswordDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Log in and obtain JWT access token' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change current authenticated user password' })
  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
    return this.authService.changePassword(
      req.user.id,
      changePasswordDto.newPassword,
      changePasswordDto.oldPassword,
    );
  }

  @ApiOperation({ summary: 'Request password reset token via email' })
  @Post('forgot-password')
  async forgotPassword(@Body() ForgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(ForgotPasswordDto.email);
  }

  @ApiOperation({ summary: 'Reset password using verification token' })
  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
  }
}
