import { forwardRef, Module } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { IndexController } from './index.controller';
import AccountsService from 'src/services/accounts.service';
import CategoriesService from 'src/services/categories.service';
import TransactionsService from 'src/services/transactions.service';
import { CurrenciesService } from 'src/services/currencies.service';
import { Currency } from 'src/entities/currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Account, Category, User, Currency])],
  controllers: [IndexController],
  providers: [AccountsService, CategoriesService, TransactionsService, CurrenciesService]
})
export class IndexModule {}
