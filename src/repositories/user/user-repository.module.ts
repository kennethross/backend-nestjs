import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user-repository.service';
import { DbModule } from 'src/shared/services/db/db.module';

@Module({
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
  imports: [DbModule],
})
export class UserRepositoryModule {}
