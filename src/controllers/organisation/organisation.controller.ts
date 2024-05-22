import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { JwtAuthGuard } from 'src/shared/guard/jwt.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserOrgDto } from './dto/create-org-user.dto';

@ApiTags('Organisation')
@Controller('organisation/:organisationId')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getOrganisation(
    @User() user: { id: number },
    @Param('organisationId', ParseIntPipe) organisationId: number,
  ) {
    return this.organisationService.getOrganisation({
      userId: user.id,
      organisationId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getOrganisationUsers(
    @User() user: { id: number },
    @Param('organisationId', ParseIntPipe) organisationId: number,
  ) {
    return this.organisationService.getOrganisationUsers({
      userId: user.id,
      organisationId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('users')
  createOrganisationUsers(
    @User() user: { id: number },
    @Param('organisationId', ParseIntPipe) organisationId: number,
    @Body() createOrgUserDto: CreateUserOrgDto,
  ) {
    return this.organisationService.createOrganisationUser({
      userId: user.id,
      organisationId,
      createOrgUserDto,
    });
  }
}
