import { IsOptional, IsInt, IsEnum, IsString, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SortOrderType } from './sort-order.type';

export class SortOptionsDto {
  @IsOptional()
  @IsEnum(SortOrderType)
  sort_order?: SortOrderType;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip?: number;
}

export class SortOptionsArrDto {
  @IsOptional()
  @IsEnum(SortOrderType)
  sort_order?: SortOrderType;

  @IsOptional()
  @IsArray() // <--- Добавляем валидацию массива
  @IsString({ each: true }) // <--- Проверяем каждый элемент массива
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.split(',') : value), // <--- Преобразуем строку в массив
  )
  fields?: string[];

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip?: number;
}
