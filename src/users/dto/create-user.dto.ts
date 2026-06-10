import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user', example: 'abcde@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'The password of the user', example: 'password456' })
  @IsString()
  @MinLength(6)
  password!: string;
}