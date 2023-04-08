import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from 'src/wallet/entities/currency.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountType } from 'src/enums/AccountType';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
    ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { title, accountType, currency } = createAccountDto;
    const user = await this.userRepository.findOne({where: { id: 1 }});
    const currencyEntity = await this.currencyRepository.findOne({where: { name: currency }});

    const account = new Account();
    account.user = user;
    account.currency = currencyEntity;
    account.title = title;

    let accountTypeEnum: AccountType;
    switch (accountType) {
      case 'Основной':
        accountTypeEnum = AccountType.CURRENT;
        break;
      case 'Сберегательный':
        accountTypeEnum = AccountType.SAVINGS;
        break;
      case 'Кредитный':
        accountTypeEnum = AccountType.CREDIT;
        break;
      case 'Депозитный':
        accountTypeEnum = AccountType.DEPOSIT;
        break;
      default:
        throw new Error('Incorrect account type');
    }
    account.accountType = accountTypeEnum;
    
    await this.accountRepository.save(account);
    return account;
  }

  async findAll(): Promise<Currency[]> {
    return await this.currencyRepository.find();
  }

  async findAllByUserId(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['accounts']});
    if (user && user.accounts != null) return user.accounts;
  }

  // async findAllActiveByUserId(userId: number) {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   const activeAccounts = user.accounts.filter(account => account.isActive);
  //   return activeAccounts;
  // }

  // async update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return await this.accountRepository.save({ id, updateAccountDto });
  // }

  // async remove(id: number) {
  //   return await this.accountRepository.delete(id);
  // }
}
