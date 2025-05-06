import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string | undefined;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string | undefined;
}
