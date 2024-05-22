import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { UserRepositoryModule } from 'src/repositories/user/user-repository.module';
import { OrganisationRepositoryModule } from 'src/repositories/organisation-repository/organisation-repository.module';
import { UserRoleRepositoryModule } from 'src/repositories/user-organisation-role-repository/user-organisation-role-repository.module';

@Module({
  controllers: [MeController],
  providers: [MeService],
  imports: [
    UserRepositoryModule,
    OrganisationRepositoryModule,
    UserRoleRepositoryModule,
  ],
})
export class MeModule {}
