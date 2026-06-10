import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @IsEmail()
    @ApiProperty({ example: 'test@gmail.com', description: 'User email' })
    email!: string;
    
    @ApiProperty({ example: 'strongPassword123', description: 'User password' })
    @IsNotEmpty()
    password!: string;
}   