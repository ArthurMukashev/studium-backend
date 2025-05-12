import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFileDto {
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
