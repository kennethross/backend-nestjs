import { PickType } from '@nestjs/swagger';

import { OrganisationCreateData } from './organisation-create-data';

export class OrganisationUpdateData extends PickType(OrganisationCreateData, [
  'name',
]) {}
