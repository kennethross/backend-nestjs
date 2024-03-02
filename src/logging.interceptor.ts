import {
  CallHandler,
  ExecutionContext,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { CustomLoggerService } from './shared/services/custom-logger/custom-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {
    this.logger.setContext(LoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<Request>();
    const res = httpContext.getResponse<Request>();

    const debugMessage = `${req.method} ${req.route.path}`;
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
