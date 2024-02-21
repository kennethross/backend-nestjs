import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryModule } from 'src/repositories/user/user-repository.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [UserRepositoryModule],
})
export class UserModule {}
