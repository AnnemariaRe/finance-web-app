import { Module } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Currency } from 'src/entities/currency.entity';
import { WalletController } from './wallet.controller';
import AccountsService from 'src/services/accounts.service';
import { CurrenciesService } from 'src/services/currencies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User, Currency])],
  controllers: [WalletController],
  providers: [AccountsService, CurrenciesService]
})
export class WalletModule {}
