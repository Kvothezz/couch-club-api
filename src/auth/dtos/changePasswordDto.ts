import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldPassword123', description: 'The current password' })
  @IsString()
  oldPassword!: string;

  @ApiProperty({ example: 'newPassword123', description: 'The new password' })
  @IsString()
  newPassword!: string;
}
