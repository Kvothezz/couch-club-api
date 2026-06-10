import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ example: 'resetToken123', description: 'The password reset token sent to the user email' })
    @IsString()
    token!: string;
    
    @ApiProperty({ example: 'newStrongPassword123', description: 'The new password for the user' })
    @IsString()
    @MinLength(6)
    newPassword!: string;
}