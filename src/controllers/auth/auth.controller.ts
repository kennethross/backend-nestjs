import '@fastify/cookie'; // for type declaration when tsc individual files
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() user: SignInDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const token = await this.authService.signIn(user);
    res.setCookie('access_token', token.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }
}
