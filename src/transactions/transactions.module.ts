import { forwardRef, Module } from '@nestjs/common';
import TransactionsService from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Account, Category, User])],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
