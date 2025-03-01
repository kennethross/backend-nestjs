import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class PaginationEntity<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  @IsInt()
  page: number;

  @ApiProperty()
  @IsInt()
  count: number;

  @ApiProperty()
  @IsInt()
  totalPage: number;
}
