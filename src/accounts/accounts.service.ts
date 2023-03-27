import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from 'src/currencies/entities/currency.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
    ) {}

  async create(userId: number, currencyId: number, createAccountDto: CreateAccountDto) {
    const { title, balance, accountType } = createAccountDto;
    const user = await this.userRepository.findOne({where: { id: userId}});
    const currency = await this.currencyRepository.findOne({where: { id: currencyId}});

    const account = new Account();
    account.user = user;
    account.accountType = accountType;
    account.balance = balance;
    account.currency = currency;
    account.title = title;

    await this.accountRepository.save(account);
    return account;
  }

  async findOne(id: number) {
    return await this.accountRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return await this.accountRepository.save({ id, updateAccountDto });
  }

  async remove(id: number) {
    return await this.accountRepository.delete(id);
  }
}
