import { Injectable } from '@nestjs/common';
import { DbService } from 'src/shared/services/db/db.service';
import { UserCreateData } from './user-create-data';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserUpdateData } from './user-update-data';
import { Prisma } from '@prisma/client';

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true,
  email: true,
  firstName: true,
  lastName: true,
  createdAt: true,
  updatedAt: true,
});

@Injectable()
export class UserRepositoryService {
  constructor(private readonly dbService: DbService) {}

  async findOne(data: { username: string }) {
    const { username } = data;
    return this.dbService.user.findFirst({
      where: {
        username,
        deleted: 0,
      },
    });
  }

  async findOneById(data: { id: number }) {
    const { id } = data;
    return this.dbService.user.findFirst({
      select: defaultUserSelect,
      where: {
        id,
        deleted: 0,
      },
    });
  }

  async findUsername(username: string) {
    return this.dbService.user.findFirst({
      select: defaultUserSelect,
      where: {
        username,
        deleted: 0,
      },
    });
  }

  async findEmail(email: string) {
    return this.dbService.user.findFirst({
      select: defaultUserSelect,
      where: {
        email,
        deleted: 0,
      },
    });
  }

  async getAll() {
    return this.dbService.user.findMany({
      select: defaultUserSelect,
      where: {
        deletedAt: null,
      },
    });
  }

  async create(data: UserCreateData) {
    const _data = plainToInstance(UserCreateData, data);

    await validate(_data, {
      whitelist: true,
    });

    return this.dbService.user.create({
      select: defaultUserSelect,
      data: {
        ..._data,
      },
    });
  }

  async update(id: number, data: UserUpdateData) {
    const _data = plainToInstance(UserUpdateData, data);
    await validate(_data, {
      whitelist: true,
    });

    return this.dbService.user.update({
      data: {
        ..._data,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
      select: defaultUserSelect,
    });
  }

  async delete(id: number) {
    const date = new Date();
    return this.dbService.user.update({
      where: {
        id,
        deleted: 0,
      },
      data: {
        deleted: 1,
        deletedAt: date,
        updatedAt: date,
      },
      select: defaultUserSelect,
    });
  }
}
