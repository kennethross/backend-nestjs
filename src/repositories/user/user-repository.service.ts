import { Injectable } from '@nestjs/common';
import { DbService } from 'src/services/db/db.service';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly dbService: DbService) {}

  async findOne(data: { username: string }) {
    const { username } = data;
    return this.dbService.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findOneById(data: { id: string }) {
    const { id } = data;
    return this.dbService.user.findFirst({
      where: {
        id,
      },
    });
  }
}
