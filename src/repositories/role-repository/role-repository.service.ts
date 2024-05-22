import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/shared/services/db/db.service';

@Injectable()
export class RoleRepositoryService {
  constructor(private readonly dbService: DbService) {}

  findOne(data: Pick<Prisma.RoleWhereInput, 'id' | 'name'>) {
    return this.dbService.role.findFirst({
      where: {
        ...data,
        deleted: 0,
      },
    });
  }
}
