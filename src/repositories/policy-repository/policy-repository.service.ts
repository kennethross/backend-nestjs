import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OrganisationAdminRole } from 'src/shared/enums/role.enums';
import { DbService } from 'src/shared/services/db/db.service';

@Injectable()
export class PolicyRepositoryService {
  constructor(private readonly dbService: DbService) {}

  async findAllByRole(roleName: OrganisationAdminRole) {
    return this.dbService.policy.findMany({
      where: {
        roleName,
        deleted: 0,
      },
    });
  }

  async findOne(
    data: Pick<Prisma.PolicyWhereInput, 'roleName' | 'actionName'>,
  ) {
    return this.dbService.policy.findFirst({
      where: {
        ...data,
        deleted: 0,
      },
    });
  }
}
