import { IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'user@email.com', description: 'The user email' })
  @IsEmail({}, { message: 'Insert a valid email address' })
  email!: string;
}