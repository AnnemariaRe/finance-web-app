import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const time = Date.now() - start;
        response.setHeader('X-Server-Processing-Time', `${time}`);
      }),
      map(() => {
        const time = Date.now() - start;
        return { responseTime: time };
      }),
    );
  }
}