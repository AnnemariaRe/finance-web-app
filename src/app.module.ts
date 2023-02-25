import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { ResponseTimeInterceptor } from './response-time.interceptor';

@Module({
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor},],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
