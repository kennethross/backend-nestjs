import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class OrganisationAdminEntity {
  @ApiProperty()
  userId!: number;

  @ApiProperty()
  roleName!: string;

  @ApiProperty({
    type: UserEntity,
  })
  user!: UserEntity;

  constructor(partial: Partial<OrganisationAdminEntity>) {
    Object.assign(this, partial);
  }
}
