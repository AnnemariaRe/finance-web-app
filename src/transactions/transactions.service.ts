import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export default class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    ) {}

  async create(accountId: number, categoryId: number, createTransactionDto: CreateTransactionDto) {
    const { operationType, amount, date } = createTransactionDto;
    const account = await this.accountRepository.findOne({where: { id: accountId }});
    const category = await this.categoryRepository.findOne({where: { id: categoryId }});

    const transaction = new Transaction();
    transaction.operationType = operationType;
    transaction.amount = amount;
    transaction.category = category;
    transaction.date = date;
    transaction.account = account;

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  async findOne(id: number) {
    return await this.transactionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionRepository.save({ id, updateTransactionDto });
  }
}
