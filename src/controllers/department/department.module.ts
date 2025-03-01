import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentRepositoryModule } from 'src/repositories/department-repository/department-repository.module';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [DepartmentRepositoryModule],
})
export class DepartmentModule {}
