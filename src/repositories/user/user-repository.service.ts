import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '$2b$10$rAr0JxOcJXsiFXacd.zIwuBBe0n0hO7M0HLAwKib7hGLsUjNGIhuO',
    },
    {
      userId: 2,
      username: 'maria',
      password: '$2b$10$397jPd/MputY0W6A90/b5u0leCMd9L7ibqfav1ifXMExVFxelKS5i',
    },
  ];

  async findOne(data: { username: string }) {
    const { username } = data;
    return this.users.find((user) => user.username === username);
  }
}
