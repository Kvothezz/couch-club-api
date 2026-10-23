import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'currentPassword123', description: 'Current account password' })
  @IsString()
  oldPassword!: string;

  @ApiProperty({ example: 'newStrongPassword123', description: 'New account password' })
  @IsString()
  newPassword!: string;
}
