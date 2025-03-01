import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/shared/services/db/db.service';
import { DepartmentCreateData } from './department-create-data';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const defaultSelect: Prisma.DepartmentSelect = {
  id: true,
  name: true,
  organisationId: true,
  createdAt: true,
  updatedAt: true,
};

// type ReturnDepartmentType<T> = Prisma.DepartmentGetPayload<{ select: T }>;
type ReturnDepartmentType<T> = T extends Prisma.DepartmentSelect
  ? Prisma.DepartmentGetPayload<{ select: T }>
  : never;

@Injectable()
export class DepartmentRepositoryService {
  constructor(private readonly dbService: DbService) {}

  async findTest(select: Prisma.DepartmentSelect) {
    return this.dbService.department.findFirst({
      select,
      where: {
        deleted: 0,
      },
    });
  }

  async findOneSelectCustom<T extends Prisma.DepartmentSelect>(
    data: Pick<Prisma.DepartmentWhereInput, 'id'>,
    select: T,
  ): Promise<ReturnDepartmentType<T> | null> {
    const { id } = data;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.dbService.department.findFirst({
      select,
      where: {
        id,
        deleted: 0,
      },
    });
  }

  async findMany(data: Pick<Prisma.DepartmentWhereInput, 'organisationId'>) {
    const { organisationId } = data;

    return this.dbService.department.findMany({
      select: defaultSelect,
      where: {
        organisationId,
      },
    });
  }

  async findOne(id: number) {
    return this.dbService.department.findFirst({
      select: defaultSelect,
      where: {
        id,
        deleted: 0,
      },
    });
  }

  async create(data: DepartmentCreateData) {
    const _data = plainToInstance(DepartmentCreateData, data);
    await validate(_data, { whitelist: true });

    const currentDate = new Date();
    return this.dbService.department.create({
      data: {
        ..._data,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    });
  }
}
