import { Controller, Get, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guard/jwt.guard';

@ApiTags('Me')
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user: { id: number; username: string }) {
    return this.meService.userProfile({ userId: user.id });
  }

  @Get('organisations')
  @UseGuards(JwtAuthGuard)
  getOrganisation(@User() user: { id: number }) {
    return this.meService.getOrganisationsFromUser({ userId: user.id });
  }
}
