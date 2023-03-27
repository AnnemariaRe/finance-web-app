import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Currency } from 'src/currencies/entities/currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User, Currency])],
  controllers: [AccountsController],
  providers: [AccountsService]
})
export class AccountsModule {}
