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
import { JwtAuthGuard } from '../../guard/jwt.guard';
import { Request, Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';

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
  async getProfile(@Req() req: Request) {
    const { userId } = req['user'] as { userId: number };
    const result = await this.authService.userProfile({ userId });
    console.log(result);
    return result;
  }

  @Post('register')
  async postRegister(@Body() registerUser: RegisterUserDto) {
    return this.authService.registerNewUser(registerUser);
  }
}
