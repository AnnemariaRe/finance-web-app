import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Category, OperationType } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';

@Controller('transactions')
@ApiTags('transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiCreatedResponse({ type: TransactionEntity })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get(':userId')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  findAllFromUser(@Param('userId') userId: string) {
    return this.transactionsService.findAllFromUser(+userId);
  }

  @Get(':userId/:accountId')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  findAllFromUserAccount(@Param('userId') userId: string, @Param('accountId') accountId: string) {
    return this.transactionsService.findAllFromUserAccount(+userId, +accountId);
  }

  @Get(':userId/:operationType')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  findAllFromUserWithOperationType(@Param('userId') userId: string, @Param('transactionType') transactionType: OperationType) {
    return this.transactionsService.findAllFromUserWithOperationType(+userId, transactionType);
  }

  @Get(':userId/:category')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  findAllFromUserWithCategory(@Param('userId') userId: string, @Param('category') category: Category) {
    return this.transactionsService.findAllFromUserWithCategory(+userId, category);
  }

  @Get(':id')
  @ApiOkResponse({ type: TransactionEntity})
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TransactionEntity})
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TransactionEntity})
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
