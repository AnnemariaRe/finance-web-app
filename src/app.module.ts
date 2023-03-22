import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { ResponseTimeInterceptor } from './response-time.interceptor';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions/entities/transaction.entity';
import { User } from './users/entities/user.entity';
import { Account } from './accounts/entities/account.entity';
import { Category } from './category/entities/category.entity';

@Module({
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor}],
  imports: [UsersModule, AccountsModule, TransactionsModule, CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cg31sbseoogop1850im0-a.frankfurt-postgres.render.com',
      port: 5432,
      username: 'annemarias_db_user',
      password: 'Yhnrvpy3eDQKyc76U83n6nFkSE70sWLr',
      database: 'annemarias_db',
      entities: [User, Transaction, Account, Category],
      synchronize: true,
      ssl: true
    }),],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  }
}