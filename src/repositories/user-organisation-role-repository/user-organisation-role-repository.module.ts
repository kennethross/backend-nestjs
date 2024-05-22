import { Module } from '@nestjs/common';
import { DbModule } from 'src/shared/services/db/db.module';
import { UserOrganisationRoleRepositoryService } from './user-organisation-role-repository.service';

@Module({
  providers: [UserOrganisationRoleRepositoryService],
  exports: [UserOrganisationRoleRepositoryService],
  imports: [DbModule],
})
export class UserRoleRepositoryModule {}
