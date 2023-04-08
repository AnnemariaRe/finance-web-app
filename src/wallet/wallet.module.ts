import { Module } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Currency } from 'src/wallet/entities/currency.entity';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User, Currency])],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
