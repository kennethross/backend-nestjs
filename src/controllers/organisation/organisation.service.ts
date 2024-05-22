import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OrganisationRepositoryService } from 'src/repositories/organisation-repository/organisation-repository.service';
import { UserOrganisationRoleRepositoryService } from 'src/repositories/user-organisation-role-repository/user-organisation-role-repository.service';
import { UserRepositoryService } from 'src/repositories/user/user-repository.service';
import { CreateUserOrgDto } from './dto/create-org-user.dto';
import { RoleRepositoryService } from 'src/repositories/role-repository/role-repository.service';
import { PolicyRepositoryService } from 'src/repositories/policy-repository/policy-repository.service';

@Injectable()
export class OrganisationService {
  constructor(
    private readonly organisationRepo: OrganisationRepositoryService,
    private readonly userRoleRepo: UserOrganisationRoleRepositoryService,
    private readonly userRepo: UserRepositoryService,
    private readonly roleRepo: RoleRepositoryService,
    private readonly policyRepo: PolicyRepositoryService,
  ) {}

  async getOrganisation(data: { userId: number; organisationId: number }) {
    const { userId, organisationId } = data;
    await this.resourceAuthorisation({
      userId,
      organisationId,
      actionName: 'read',
      resource: 'organisation',
    });

    return this.organisationRepo.findOne({
      id: organisationId,
    });
  }

  async getOrganisationUsers(data: { userId: number; organisationId: number }) {
    const { userId, organisationId } = data;
    await this.resourceAuthorisation({
      userId,
      organisationId,
      actionName: 'read',
      resource: 'user',
    });

    const userRoles = await this.userRoleRepo.findMany({ organisationId });
    return this.userRepo.findManyByUserIds({
      userIds: userRoles.map((x) => x.userId),
    });
  }

  async createOrganisationUser(data: {
    userId: number;
    organisationId: number;
    createOrgUserDto: CreateUserOrgDto;
  }) {
    const { userId, organisationId, createOrgUserDto } = data;

    await this.resourceAuthorisation({
      userId,
      organisationId,
      actionName: 'create',
      resource: 'user',
    });

    const role = await this.roleRepo.findOne({ id: createOrgUserDto.roleId });
    if (!role) {
      throw new NotFoundException('Invalid role');
    }

    let user = await this.userRepo.findOne({
      username: createOrgUserDto.username,
      email: createOrgUserDto.email,
    });
    if (!user) {
      user = await this.userRepo.create({
        firstName: createOrgUserDto.firstName,
        lastName: createOrgUserDto.lastName,
        username: createOrgUserDto.username,
        email: createOrgUserDto.email,
        password: '',
      });
    }

    const userRole = this.userRoleRepo.findOne({
      organisationId,
      userId: user.id,
    });
    if (userRole) {
      throw new UnprocessableEntityException(
        'User already part of organisation',
      );
    }

    await this.userRoleRepo.create({
      userId: user.id,
      organisationId,
      roleName: role.name,
    });

    return user;
  }

  private async resourceAuthorisation(data: {
    userId: number;
    organisationId: number;
    actionName: 'read' | 'create' | 'update' | 'delete';
    resource: string;
  }) {
    const { userId, organisationId, actionName } = data;
    const userRole = await this.userRoleRepo.findOne({
      userId,
      organisationId,
    });
    if (!userRole) {
      throw new UnauthorizedException();
    }

    const policy = await this.policyRepo.findOne({
      roleName: userRole.roleName,
      actionName,
    });
    console.log('policy', policy);
    if (!policy) {
      throw new UnauthorizedException();
    }
  }
}
