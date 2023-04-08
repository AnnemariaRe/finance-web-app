import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { ResponseTimeInterceptor } from './response-time.interceptor';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './index/entities/transaction.entity';
import { User } from './users/entities/user.entity';
import { Account } from './wallet/entities/account.entity';
import { Category } from './categories/entities/category.entity';
import { Currency } from './wallet/entities/currency.entity';
import { AccountType } from './enums/AccountType';
import { WalletModule } from './wallet/wallet.module';
import { IndexModule } from './index/index.module';

@Module({
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor}],
  imports: [UsersModule, IndexModule, CategoriesModule, WalletModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cg31sbseoogop1850im0-a.frankfurt-postgres.render.com',
      port: 5432,
      username: 'annemarias_db_user',
      password: 'Yhnrvpy3eDQKyc76U83n6nFkSE70sWLr',
      database: 'annemarias_db',
      //url: process.env.DATABASE_URL,
      entities: [User, Transaction, Account, Category, Currency],
      synchronize: true,
      ssl: true
    })],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  }

  public static AccountType = AccountType;
}