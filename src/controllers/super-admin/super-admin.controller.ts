/* eslint-disable import/order */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guard/jwt.guard';
import { SuperAdminGuard } from 'src/shared/guard/super-admin.guard';
import { generateApiOkPaginationSchema } from 'src/shared/utils/generate-api-ok-schema';

import { GetOrganisationDto } from './dto/get-organisation.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { DepartmentEntity } from './entities/department.entity';
import { OrganisationAdminEntity } from './entities/organisation-admin.entity';
import { OrganisationEntity } from './entities/organisation.entity';
import { SuperAdminService } from './super-admin.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';

@ApiTags('Super Admin')
@Controller('super-admin')
@UseGuards(JwtAuthGuard, SuperAdminGuard)
@ApiExtraModels(
  OrganisationEntity,
  DepartmentEntity,
  OrganisationAdminEntity,
  PaginationQueryDto,
)
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Get('organisations')
  @ApiOkResponse({
    schema: generateApiOkPaginationSchema({
      $ref: getSchemaPath(OrganisationEntity),
    }),
  })
  async getOrganisations(@Query() paginationQuery: PaginationQueryDto) {
    return this.superAdminService.getOrganisations(paginationQuery);
  }

  @Post('organisations')
  @ApiOkResponse({
    description: 'Create new organisation',
    type: OrganisationEntity,
  })
  @ApiOkResponse({
    schema: generateApiOkPaginationSchema({
      $ref: getSchemaPath(OrganisationEntity),
    }),
  })
  async createOrganisation(
    @Body() createOrganisationDto: CreateOrganisationDto,
  ) {
    return this.superAdminService.createOrganisation(createOrganisationDto);
  }

  @Patch('organisations/:organisationId')
  @ApiNoContentResponse()
  async updateOrganisation(
    @Param() organisationDto: GetOrganisationDto,
    @Body() updateData: UpdateOrganisationDto,
  ) {
    return this.superAdminService.updateOrganisation({
      organisationId: +organisationDto.organisationId,
      updateData,
    });
  }

  @Delete('organisations/:organisationId')
  @ApiNoContentResponse()
  @HttpCode(204)
  async deleteOrganisation(@Param() organisationDto: GetOrganisationDto) {
    return this.superAdminService.deleteOrganisation(
      +organisationDto.organisationId,
    );
  }

  @Get('organisations/:organisationId')
  @ApiOkResponse({
    description: 'List of organisations',
    type: OrganisationEntity,
  })
  async getOrganisation(@Param() organisationDto: GetOrganisationDto) {
    return this.superAdminService.getOrganisation(
      +organisationDto.organisationId,
    );
  }

  @Get('organisations/:organisationId/departments')
  @ApiOkResponse({
    description: 'List of departments',
    type: [DepartmentEntity],
  })
  async getOrganisationDepartments(
    @Param() organisationDto: GetOrganisationDto,
  ) {
    return this.superAdminService.getOrganisationDepartments(
      +organisationDto.organisationId,
    );
  }

  @Get('organisations/:organisationId/admins')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    description: 'List of organisation admins',
    type: [OrganisationAdminEntity],
  })
  async getOrganisationAdmin(@Param() organisationDto: GetOrganisationDto) {
    return this.superAdminService.getOrganisationAdmins(
      +organisationDto.organisationId,
    );
  }
}
