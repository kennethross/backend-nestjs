import { Module } from '@nestjs/common';
import { PolicyRepositoryService } from './policy-repository.service';
import { DbModule } from 'src/shared/services/db/db.module';

@Module({
  providers: [PolicyRepositoryService],
  imports: [DbModule],
  exports: [PolicyRepositoryService],
})
export class PolicyRepositoryModule {}
