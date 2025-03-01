import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DepartmentRepositoryService } from 'src/repositories/department-repository/department-repository.service';
import { OrganisationRepositoryService } from 'src/repositories/organisation-repository/organisation-repository.service';
import { UserOrganisationRoleRepositoryService } from 'src/repositories/user-organisation-role-repository/user-organisation-role-repository.service';

import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { DepartmentEntity } from './entities/department.entity';
import { OrganisationAdminEntity } from './entities/organisation-admin.entity';
import { OrganisationEntity } from './entities/organisation.entity';
import { PaginationEntity } from './entities/pagination.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class SuperAdminService {
  constructor(
    private readonly organisationRepo: OrganisationRepositoryService,
    private readonly deptRepo: DepartmentRepositoryService,
    private readonly userOrganisationRoleRepo: UserOrganisationRoleRepositoryService,
  ) {}

  async getOrganisations(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginationEntity<OrganisationEntity>> {
    const query = plainToInstance(PaginationQueryDto, paginationQuery);
    const { count, data } = await this.organisationRepo.findAllWithPagination({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      data,
      page: query.page,
      count,
      totalPage: Math.ceil(count / query.limit),
    };
  }

  async createOrganisation(
    data: CreateOrganisationDto,
  ): Promise<OrganisationEntity> {
    return this.organisationRepo.create(data);
  }

  async updateOrganisation(data: {
    organisationId: number;
    updateData: UpdateOrganisationDto;
  }) {
    const { organisationId, updateData } = data;
    return this.organisationRepo.update(organisationId, updateData);
  }

  async deleteOrganisation(organisationId: number) {
    await this.organisationRepo.delete(organisationId);
  }

  async getOrganisation(organisationId: number) {
    return this.organisationRepo.findOne({ id: organisationId });
  }

  async getOrganisationDepartments(
    organisationId: number,
  ): Promise<DepartmentEntity[]> {
    return this.deptRepo.findMany({ organisationId });
  }

  async getOrganisationAdmins(
    organisationId: number,
  ): Promise<OrganisationAdminEntity[]> {
    const results = await this.userOrganisationRoleRepo.findManySelectCustom<{
      userId: true;
      roleName: true;
      role: true;
      user: true;
    }>(
      { organisationId },
      {
        userId: true,
        roleName: true,
        role: true,
        user: true,
      },
    );

    return results.map((result) => {
      const { user, ...rest } = result;
      const userEntity = new UserEntity(user);
      return new OrganisationAdminEntity({
        ...rest,
        user: userEntity,
      });
    });
  }
}
