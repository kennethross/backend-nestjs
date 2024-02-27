import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/user/user-repository.service';
import { PostUserDto } from './dto/post-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepositoryService) {}

  async getAll() {
    return this.userRepo.getAll();
  }

  async getOne(data: { userId: number }) {
    return this.userRepo.findOneById({ id: data.userId });
  }

  async create(data: PostUserDto) {
    const userEmail = await this.userRepo.findEmail(data.email);
    if (userEmail) {
      throw new UnprocessableEntityException('Email already exists');
    }
    const username = await this.userRepo.findUsername(data.username);
    if (username) {
      throw new UnprocessableEntityException('Username already exists');
    }

    return this.userRepo.create(data);
  }

  async update(data: { id: number; payload: PatchUserDto }) {
    const { id, payload } = data;
    const user = await this.userRepo.findOneById({ id });
    if (!user) {
      return;
    }

    return this.userRepo.update(id, payload);
  }

  async delete(id: number) {
    const user = await this.userRepo.findOneById({ id });
    if (!user) {
      return;
    }
    await this.userRepo.delete(id);
  }
}
