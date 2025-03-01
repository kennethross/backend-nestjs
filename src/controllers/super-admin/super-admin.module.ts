import { Module } from '@nestjs/common';
import { DepartmentRepositoryModule } from 'src/repositories/department-repository/department-repository.module';
import { OrganisationRepositoryModule } from 'src/repositories/organisation-repository/organisation-repository.module';
import { UserRoleRepositoryModule } from 'src/repositories/user-organisation-role-repository/user-organisation-role-repository.module';

import { SuperAdminController } from './super-admin.controller';
import { SuperAdminService } from './super-admin.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SuperAdminController],
  providers: [
    SuperAdminService,
    // {
    // provide: APP_INTERCEPTOR,
    // useClass: CustomCacheInterceptor,
    // },
  ],
  imports: [
    OrganisationRepositoryModule,
    AuthModule,
    DepartmentRepositoryModule,
    UserRoleRepositoryModule,
  ],
})
export class SuperAdminModule {}
