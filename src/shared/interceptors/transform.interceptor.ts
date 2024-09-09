import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Observable, map } from 'rxjs';

export interface ResponseBody<T> {
  code: number;
  data: T;
  error: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseBody<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBody<T>> {
    const res = context.switchToHttp().getResponse<FastifyReply>();
    return next.handle().pipe(
      map((data) => {
        if (data !== undefined) {
          return {
            code: res.statusCode,
            data,
            error: null,
          };
        }

        res.status(204);
        return undefined;
      }),
    );
  }
}
