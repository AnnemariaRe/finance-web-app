import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OperationType } from 'src/enums/OperationType';
import { User } from 'src/users/entities/user.entity';
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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

  async create(accountId: number, categoryId: number, createTransactionDto: CreateTransactionDto) {
    const { amount, date } = createTransactionDto;
    const account = await this.accountRepository.findOne({where: { id: accountId }});
    const category = await this.categoryRepository.findOne({where: { id: categoryId }});

    const transaction = new Transaction();
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

  async findAllByUserId(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const transactions = user.accounts.reduce(
      (acc, account) => acc.concat(account.transactions),
      [],
    );
    return transactions;
  }

  async findAllByAccountId(accountId: number) {
    const account = await this.accountRepository.findOne({where: { id: accountId }});
    return account.transactions;
  }

  // async findAllFromUserWithOperationType(userId: number, transactionType: OperationType) {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   const transactions = user.accounts.reduce(
  //     (acc, account) => acc.concat(account.transactions),
  //     [],
  //   );
  //   const filteredTransactions = transactions.filter(transaction => transaction.OperationType == transactionType);
  //   return filteredTransactions;
  // }

  async findAllFromUserInCategory(userId: number, categoryId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const transactions = user.accounts.reduce(
      (acc, account) => acc.concat(account.transactions),
      [],
    );
    const transactionsInCategory = transactions.filter(
      transaction => transaction.category && transaction.category.id === categoryId,
    );

    return transactionsInCategory;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionRepository.save({ id, updateTransactionDto });
  }
}
