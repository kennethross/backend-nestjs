import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/shared/services/db/db.service';

@Injectable()
export class OrganisationRepositoryService {
  constructor(private readonly dbService: DbService) {}

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
}
