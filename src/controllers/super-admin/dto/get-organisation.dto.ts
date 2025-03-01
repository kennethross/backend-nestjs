import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetOrganisationDto {
  @ApiProperty({ description: 'Organisation ID' })
  @Type(() => Number)
  @IsNumber()
  organisationId!: number;
}
