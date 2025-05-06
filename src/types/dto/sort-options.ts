import { IsOptional, IsInt, IsEnum, IsString, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SortOrderType } from './sort-order';

export class SortOptionsDto {
  @IsEnum(SortOrderType)
  @IsOptional()
  sort_order?: SortOrderType;

  @IsString()
  @IsOptional()
  field?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  take?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  skip?: number;
}

export class SortOptionsArrDto {
  @IsOptional()
  @IsEnum(SortOrderType)
  sort_order?: SortOrderType;

  @IsArray() // <--- Добавляем валидацию массива
  @IsOptional()
  @IsString({ each: true }) // <--- Проверяем каждый элемент массива
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.split(',') : value), // <--- Преобразуем строку в массив
  )
  fields?: string[];

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  take?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  skip?: number;
}
