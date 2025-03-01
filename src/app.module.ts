import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AuthModule } from './controllers/auth/auth.module';
import { DepartmentModule } from './controllers/department/department.module';
import { MeModule } from './controllers/me/me.module';
import { OrganisationModule } from './controllers/organisation/organisation.module';
import { SuperAdminModule } from './controllers/super-admin/super-admin.module';
import { UserModule } from './controllers/user/user.module';
import { LoggingInterceptor } from './logging.interceptor';
import { DepartmentRepositoryModule } from './repositories/department-repository/department-repository.module';
import { PolicyRepositoryModule } from './repositories/policy-repository/policy-repository.module';
import { RoleRepositoryModule } from './repositories/role-repository/role-repository.module';
import { UserRoleRepositoryModule } from './repositories/user-organisation-role-repository/user-organisation-role-repository.module';
import { CustomLoggerModule } from './shared/services/custom-logger/custom-logger.module';
import { DbModule } from './shared/services/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CustomLoggerModule,
    AuthModule,
    SuperAdminModule,
    MeModule,
    OrganisationModule,
    DbModule,
    PolicyRepositoryModule,
    UserModule,
    UserRoleRepositoryModule,
    RoleRepositoryModule,
    DepartmentModule,
    DepartmentRepositoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
