import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Example title',
    description: 'Название элемента',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Пример описания',
    description: 'Детальное описание',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
