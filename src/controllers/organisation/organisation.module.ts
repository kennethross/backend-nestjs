import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { OrganisationRepositoryModule } from 'src/repositories/organisation-repository/organisation-repository.module';
import { UserRoleRepositoryModule } from 'src/repositories/user-organisation-role-repository/user-organisation-role-repository.module';
import { UserRepositoryModule } from 'src/repositories/user/user-repository.module';
import { RoleRepositoryModule } from 'src/repositories/role-repository/role-repository.module';
import { PolicyRepositoryModule } from 'src/repositories/policy-repository/policy-repository.module';

@Module({
  controllers: [OrganisationController],
  providers: [OrganisationService],
  imports: [
    OrganisationRepositoryModule,
    UserRoleRepositoryModule,
    UserRepositoryModule,
    RoleRepositoryModule,
    PolicyRepositoryModule,
  ],
})
export class OrganisationModule {}
