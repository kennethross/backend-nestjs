import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';

import { CustomLoggerService } from './shared/services/custom-logger/custom-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {
    this.logger.setContext(LoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<FastifyRequest>();
    const res = httpContext.getResponse<FastifyReply>();

    const debugMessage = `${req.method} ${req.routeOptions.url}`;
    this.logger.log(debugMessage);

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${debugMessage} ${res.statusCode} ${Date.now() - startTime}ms`,
        );
      }),
    );
  }
}
