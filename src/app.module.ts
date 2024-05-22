import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { CustomLoggerModule } from './shared/services/custom-logger/custom-logger.module';
import { DbModule } from './shared/services/db/db.module';
import { UserModule } from './controllers/user/user.module';
import { PolicyRepositoryModule } from './repositories/policy-repository/policy-repository.module';
import { UserRoleRepositoryModule } from './repositories/user-organisation-role-repository/user-organisation-role-repository.module';
import { MeModule } from './controllers/me/me.module';
import { OrganisationModule } from './controllers/organisation/organisation.module';
import { RoleRepositoryModule } from './repositories/role-repository/role-repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MeModule,
    OrganisationModule,
    CustomLoggerModule,
    DbModule,
    PolicyRepositoryModule,
    UserModule,
    UserRoleRepositoryModule,
    RoleRepositoryModule,
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
