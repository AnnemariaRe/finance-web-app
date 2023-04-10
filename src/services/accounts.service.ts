import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from 'src/dto/create-account.dto';
import { Currency } from 'src/entities/currency.entity';
import { AccountType } from 'src/enums/AccountType';

@Injectable()
export default class AccountsService {
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

  async findAllActiveByUserId(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['accounts'] });
    return user.accounts;
  }

  async findAllByUserId(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['accounts.transactions']});
    if (user && user.accounts != null) return user.accounts;
  }
}