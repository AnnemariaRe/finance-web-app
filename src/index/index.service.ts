import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/wallet/entities/account.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OperationType } from 'src/enums/OperationType';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export default class IndexService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

  async create(userId: number, createTransactionDto: CreateTransactionDto) {
    const { amount, date, account, category } = createTransactionDto;
    const user = await this.userRepository.findOne({where: { id: userId }});
    const _account = await this.accountRepository.findOne({where: { user: user, title: account }});
    const _category = await this.categoryRepository.findOne({where: { user: user, name: category }});

    const transaction = new Transaction();
    if (_category.operationType == OperationType.EXPENSE) {
      transaction.amount = -amount;
    } else {
      transaction.amount = amount;
    }
  
    transaction.category = _category;
    transaction.date = date;
    transaction.account = _account;

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  async findAllActiveByUserId(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['accounts'] });
    return user.accounts;
  }

  async findCategoriesByUserId(userId: number) {
    const user  = await this.userRepository.findOne({ where: { id: userId }, relations: ['categories']});
    return user.categories;
  }

}
