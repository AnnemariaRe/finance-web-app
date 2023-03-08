import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { PrismaService } from './prisma/prisma.service';
import { ResponseTimeInterceptor } from './response-time.interceptor';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor},
    PrismaService],
  imports: [UsersModule, AccountsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
