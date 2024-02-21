import { ApiProperty } from '@nestjs/swagger';

export class GetUserEntity {
  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  username!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  deletedAt!: Date;
}
