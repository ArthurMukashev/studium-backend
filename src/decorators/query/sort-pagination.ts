import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { SortOrderType } from '@/types';

export function SortPaginationQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'sort_order',
      required: false,
      enum: SortOrderType,
      description: 'Сортировка по (desc/asc)',
      example: SortOrderType.ASC,
      schema: {
        default: SortOrderType.ASC,
      },
    }),
    ApiQuery({
      name: 'field',
      required: false,
      type: String,
      description: 'По какому полю сортировать(по дефолту - created_at)',
      example: '',
    }),
    ApiQuery({
      name: 'take',
      required: false,
      type: Number,
      description: 'Количество записей',
      example: 10,
    }),
    ApiQuery({
      name: 'skip',
      required: false,
      type: Number,
      description: 'Количество записей для пропуска',
      example: 0,
    }),
  );
}

export function SortPaginationArrQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'sort_order',
      required: false,
      enum: SortOrderType,
      description: 'Сортировка по (desc/asc)',
      example: SortOrderType.ASC,
      schema: {
        default: SortOrderType.ASC,
      },
    }),
    ApiQuery({
      name: 'fields',
      required: false,
      type: [String],
      isArray: true,
      description:
        'Поля для сортировки (через запятую или несколько параметров user.name user.surname). По умолчанию: created_at',
      example: [],
    }),
    ApiQuery({
      name: 'take',
      required: false,
      type: Number,
      description: 'Количество записей',
      example: 10,
    }),
    ApiQuery({
      name: 'skip',
      required: false,
      type: Number,
      description: 'Количество записей для пропуска',
      example: 0,
    }),
  );
}
