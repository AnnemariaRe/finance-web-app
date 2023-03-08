import { Injectable } from '@nestjs/common';
import { Category, OperationType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {
  }

  create(createTransactionDto: CreateTransactionDto) {
    const { accountId, operationType, amount, category, transactionDate } = createTransactionDto;
    return this.prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        transactions: {
          create: { operationType, amount, category, transactionDate },
        },
      },
      include: {
        transactions: { take: -1 }
      }
    });
  }

  findAllFromUser(userId: number) {
    const user = this.prisma.user.findUnique({
      where: { id: userId },
      include: { accounts: { include: { transactions: true } } },
    })

    const transactions = []
    for (let i = 0; i < user.accounts.length; i++) {
      for (const transaction of user.accounts[i].transactions) {
        transactions.push(transaction);
      }
    }

    return transactions;
  }

  findAllFromUserAccount(userId: number, accountId: number) {
    return this.prisma.transaction.findMany({
      where: { accountId, account: { userId: userId } },
    })
  }

  findAllFromUserWithOperationType(userId: number, operationType: OperationType) {
    return this.prisma.transaction.findMany({
      where: { account: { userId: userId }, operationType },
    });
  }

  findAllFromUserWithCategory(userId: number, category: Category) {
    return this.prisma.transaction.findMany({
      where: { account: { userId: userId }, category },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  remove(id: number) {
    return this.prisma.account.delete({ where: { id } });
  }
}
