import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DbService } from 'src/shared/services/db/db.service';

import { OrganisationCreateData } from './organisation-create-data';
import { OrganisationUpdateData } from './organisation-update-data';

const defaultSelect: Prisma.OrganisationSelect = {
  id: true,
  name: true,
};

@Injectable()
export class OrganisationRepositoryService {
  constructor(private readonly dbService: DbService) {}

  async getAll() {
    return this.dbService.organisation.findMany({
      select: defaultSelect,
      where: {
        deleted: 0,
      },
    });
  }

  async findAllWithPagination(data: { skip: number; take: number }) {
    const { skip = 1, take = 10 } = data;
    const count = await this.dbService.organisation.count({
      where: {
        deleted: 0,
      },
    });
    const result = await this.dbService.organisation.findMany({
      select: defaultSelect,
      where: {
        deleted: 0,
      },
      skip,
      take,
    });

    return {
      count,
      data: result,
    };
  }

  async findMany(data: { ids: number[] }) {
    const { ids } = data;
    return this.dbService.organisation.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: {
          in: ids,
        },
        deleted: 0,
      },
    });
  }

  async findOne(data: Pick<Prisma.OrganisationWhereInput, 'id'>) {
    return this.dbService.organisation.findFirst({
      where: {
        ...data,
        deleted: 0,
      },
    });
  }

  async create(data: OrganisationCreateData) {
    const _data = plainToInstance(OrganisationCreateData, data);
    await validate(_data, { whitelist: true });
    return this.dbService.organisation.create({
      select: defaultSelect,
      data: {
        name: _data.name,
      },
    });
  }

  async update(id: number, updateData: OrganisationUpdateData) {
    const _data = plainToInstance(OrganisationUpdateData, updateData);
    await validate(_data, { whitelist: true });
    return this.dbService.organisation.update({
      select: defaultSelect,
      where: {
        id,
      },
      data: {
        name: _data.name,
      },
    });
  }

  async delete(id: number) {
    const record = await this.dbService.organisation.findFirst({
      where: {
        id,
        deleted: 0,
      },
    });
    if (!record) {
      return null;
    }
    await this.dbService.organisation.update({
      where: {
        id,
      },
      data: {
        deleted: 1,
      },
    });
  }
}
