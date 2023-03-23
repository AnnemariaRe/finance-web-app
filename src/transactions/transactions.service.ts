import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export default class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { account, operationType, amount, category, date } = createTransactionDto;

    const transaction = new Transaction();
    transaction.operationType = operationType;
    transaction.amount = amount;
    transaction.category = category;
    transaction.date = date;
    transaction.account = account;

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  findOne(id: number) {
    return this.transactionRepository.findOne({ where: { id } });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.save({ id, updateTransactionDto });
  }
}
