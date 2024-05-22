import { Allow } from 'class-validator';

export class UserOrganisationRoleCreateData {
  @Allow()
  userId!: number;

  @Allow()
  roleName!: string;

  @Allow()
  organisationId!: number;
}
