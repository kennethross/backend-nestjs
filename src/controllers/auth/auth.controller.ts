import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../shared/guard/jwt.guard';
import { Request, Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/shared/decorators/user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() user: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn(user);
    res.cookie('access_token', token.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user: { id: number; username: string }) {
    const result = await this.authService.userProfile({ userId: user.id });
    return result;
  }

  @Post('register')
  async postRegister(@Body() registerUser: RegisterUserDto) {
    return this.authService.registerNewUser(registerUser);
  }
}
