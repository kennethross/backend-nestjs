import { Module } from '@nestjs/common';
import { DepartmentRepositoryService } from './department-repository.service';
import { DbModule } from 'src/shared/services/db/db.module';

@Module({
  providers: [DepartmentRepositoryService],
  imports: [DbModule],
  exports: [DepartmentRepositoryService],
})
export class DepartmentRepositoryModule {}
