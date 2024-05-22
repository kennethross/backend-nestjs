import { Module } from '@nestjs/common';
import { OrganisationRepositoryService } from './organisation-repository.service';
import { DbModule } from 'src/shared/services/db/db.module';

@Module({
  providers: [OrganisationRepositoryService],
  imports: [DbModule],
  exports: [OrganisationRepositoryService],
})
export class OrganisationRepositoryModule {}
