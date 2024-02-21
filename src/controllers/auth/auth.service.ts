import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/user/user-repository.service';
import { JwtService } from '@nestjs/jwt';
import { encrypt, compare } from 'src/utils/encryption';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';

type LoginUser = Omit<
  Awaited<ReturnType<UserRepositoryService['findOne']>>,
  'password'
>;

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepoService: UserRepositoryService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userRepoService.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isTheSame = await this.comparePassword(pass, user.password);
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
    const payload = { sub: user.id, username: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async userProfile(data: { userId: number }) {
    const { userId } = data;
    return this.userRepoService.findOneById({ id: userId });
  }

  saltPassowrd(password: string) {
    return encrypt(password, this.configService.get('SALT_ROUNDS'));
  }

  comparePassword(password: string, encryptedPassword: string) {
    return compare(password, encryptedPassword);
  }
}
