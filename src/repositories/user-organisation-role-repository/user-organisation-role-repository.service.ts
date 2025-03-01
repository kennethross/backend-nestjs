import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DbService } from 'src/shared/services/db/db.service';

import { UserOrganisationRoleCreateData } from './user-organisation-role-create-data';

@Injectable()
export class UserOrganisationRoleRepositoryService {
  constructor(private readonly dbService: DbService) {}

  async findMany(
    data: Pick<
      Prisma.UserOrganisationRoleWhereInput,
      'id' | 'organisationId' | 'userId'
    >,
  ) {
    return this.dbService.userOrganisationRole.findMany({
      select: {
        id: true,
        userId: true,
        roleName: true,
        organisationId: true,
      },
      where: {
        ...data,
        deleted: 0,
      },
    });
  }

  async findManySelectCustom<T extends Prisma.UserOrganisationRoleSelect>(
    data: Pick<
      Prisma.UserOrganisationRoleWhereInput,
      'id' | 'organisationId' | 'userId'
    >,
    select: T,
  ) {
    return this.dbService.userOrganisationRole.findMany({
      select,
      where: {
        ...data,
        deleted: 0,
      },
    });
  }

  async findOne(
    data: Pick<
      Prisma.UserOrganisationRoleWhereInput,
      'id' | 'organisationId' | 'userId'
    >,
  ) {
    return this.dbService.userOrganisationRole.findFirst({
      where: {
        ...data,
        deleted: 0,
      },
    });
  }

  async create(data: UserOrganisationRoleCreateData) {
    const _data = plainToInstance(UserOrganisationRoleCreateData, data);
    await validate(_data, { whitelist: true });

    const date = new Date();
    return this.dbService.userOrganisationRole.create({
      data: {
        ..._data,
        updatedAt: date,
        createdAt: date,
      },
    });
  }
}
