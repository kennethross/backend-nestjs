import { Allow } from 'class-validator';

export class DepartmentCreateData {
  @Allow()
  name!: string;

  @Allow()
  organisationId!: number;
}
