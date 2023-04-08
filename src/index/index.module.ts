import { forwardRef, Module } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/wallet/entities/account.entity';
import { Category } from 'src/index/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { IndexController } from './index.controller';
import IndexService from './index.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Account, Category, User])],
  controllers: [IndexController],
  providers: [IndexService]
})
export class IndexModule {}
