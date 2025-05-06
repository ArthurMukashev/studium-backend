import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function SearchQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'search_field',
      required: false,
      type: String,
      description: 'По какому полю искать',
      example: '',
    }),
    ApiQuery({
      name: 'search_value',
      required: false,
      type: String,
      description: 'Искомое значение',
      example: '',
    }),
  );
}
