import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

const fileUploadSchema = {
  type: 'object',
  properties: {
    files: {
      type: 'array',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export const ApiFileUpload = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Загрузка файлов' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: fileUploadSchema,
    }),
  );
};
