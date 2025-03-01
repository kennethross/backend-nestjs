import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/controllers/auth/auth.service';

@Injectable()
export class SuperAdminGuard {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    const user = await this.authService.userProfile({
      userId: request.user.id,
    });
    return user?.superAdmin;
  }
}
