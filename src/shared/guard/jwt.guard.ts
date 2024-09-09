import '@fastify/cookie'; // for type declaration when tsc individual files
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = request.cookies['access_token'];
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return super.canActivate(context);
  }
}
