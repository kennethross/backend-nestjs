import { ApiResponseSchemaHost } from '@nestjs/swagger';
import { Schema } from 'inspector';

type Schema = ApiResponseSchemaHost['schema'];

export function generateApiOkObjectSchema(data: {
  code: number;
  data: Schema;
  error?: Schema;
}) {
  return {
    type: 'object',
    properties: {
      code: {
        type: 'number',
        example: 200,
      },
      data: data.data,
      error: data.error,
    },
  };
}

export function generateApiOkPaginationSchema(schema: Schema): Schema {
  return {
    type: 'object',
    properties: {
      code: {
        type: 'number',
        example: 200,
      },
      data: {
        type: 'object',
        properties: {
          list: {
            type: 'array',
            items: {
              $ref: schema.$ref,
            },
          },
          page: {
            type: 'number',
            example: 1,
          },
          count: {
            type: 'number',
            example: 1,
          },
          totalPage: {
            type: 'number',
            example: 1,
          },
        },
      },
      error: {
        type: 'string',
      },
    },
  };
}
