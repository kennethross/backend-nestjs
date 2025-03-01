import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrganisationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
