import { Allow } from 'class-validator';

export class OrganisationCreateData {
  @Allow()
  name!: string;
}
