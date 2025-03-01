import { ApiProperty } from '@nestjs/swagger';
import { OrganisationAdminRole } from 'src/shared/enums/role.enums';

import { UserEntity } from './user.entity';

export class OrganisationAdminEntity {
  @ApiProperty()
  userId!: number;

  @ApiProperty({
    enum: OrganisationAdminRole,
  })
  roleName!: OrganisationAdminRole;

  @ApiProperty({
    type: UserEntity,
  })
  user!: UserEntity;

  constructor(partial: Partial<OrganisationAdminEntity>) {
    Object.assign(this, partial);
  }
}
