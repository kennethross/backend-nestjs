import { Injectable } from '@nestjs/common';
import { DbService } from 'src/services/db/db.service';
import { UserCreateData } from './user-create-data';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserUpdateData } from './user-update-data';

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
      where: {
        id,
        deleted: 0,
      },
    });
  }

  async findUsername(username: string) {
    return this.dbService.user.findUnique({
      where: {
        username,
        deleted: 0,
      },
    });
  }

  async findEmail(email: string) {
    return this.dbService.user.findUnique({
      where: {
        email,
        deleted: 0,
      },
    });
  }

  async getAll() {
    return this.dbService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
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
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
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
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
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
    });
  }
}
