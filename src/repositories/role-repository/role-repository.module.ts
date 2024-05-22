import { Module } from '@nestjs/common';
import { RoleRepositoryService } from './role-repository.service';
import { DbModule } from 'src/shared/services/db/db.module';

@Module({
  providers: [RoleRepositoryService],
  imports: [DbModule],
  exports: [RoleRepositoryService],
})
export class RoleRepositoryModule {}
