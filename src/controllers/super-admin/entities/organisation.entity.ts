import { ApiProperty } from '@nestjs/swagger';

export class OrganisationEntity {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;
}
