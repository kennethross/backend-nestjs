import { Injectable } from '@nestjs/common';
import { OrganisationRepositoryService } from 'src/repositories/organisation-repository/organisation-repository.service';
import { UserRepositoryService } from 'src/repositories/user/user-repository.service';
import { UserOrganisationRoleRepositoryService } from 'src/repositories/user-organisation-role-repository/user-organisation-role-repository.service';

@Injectable()
export class MeService {
  constructor(
    private readonly organisationRepo: OrganisationRepositoryService,
    private readonly userRoleRepo: UserOrganisationRoleRepositoryService,
    private readonly userRepoService: UserRepositoryService,
  ) {}

  async userProfile(data: { userId: number }) {
    const { userId } = data;
    return this.userRepoService.findOneById({ id: userId });
  }

  async getOrganisationsFromUser(data: { userId: number }) {
    const { userId } = data;
    const orgAdmins = await this.userRoleRepo.findMany({
      userId,
    });

    return this.organisationRepo.findMany({
      ids: orgAdmins.map((x) => x.organisationId),
    });
  }
}
