import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from 'src/repositories/user/user-repository.service';
import { encrypt, compare } from 'src/shared/utils/encryption';

import { RegisterUserDto } from './dto/register-user.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepoService: UserRepositoryService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userRepoService.findOneIncludePassword({
      username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isTheSame = this.comparePassword(pass, user.password);
    if (!isTheSame) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }

  async signIn(data: SignInDto) {
    const { password, username } = data;
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.email,
      superAdmin: user.superAdmin,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async userProfile(data: { userId: number }) {
    const { userId } = data;
    return this.userRepoService.findOneById({ id: userId });
  }

  async registerNewUser(newUser: RegisterUserDto) {
    const isRegistered = await this.userRepoService.findEmail(newUser.email);
    if (isRegistered) {
      throw new Error('Email already registered. Please login');
    }

    const registeredUsername = await this.userRepoService.findUsername(
      newUser.username,
    );
    if (registeredUsername) {
      throw new Error(
        'Username already registered. Please find a new username',
      );
    }

    const encryptedPassword = await encrypt(
      newUser.password,
      +this.configService.get('SALT'),
    );
    const user = await this.userRepoService.create({
      ...newUser,
      password: encryptedPassword,
    });

    return {
      id: user.id,
    };
  }

  comparePassword(password: string, encryptedPassword: string) {
    return compare(password, encryptedPassword);
  }
}
