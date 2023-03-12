import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Category, OperationType } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';

@Controller('transactions')
@ApiTags('transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({summary: 'Create transaction'})
  @Post()
  @ApiCreatedResponse({ type: TransactionEntity })
  async create(@Body() createTransactionDto: CreateTransactionDto) : Promise<TransactionEntity> {
    return await this.transactionsService.create(createTransactionDto);
  }

  @ApiOperation({summary: 'Get all user transactions'})
  @Get(':userId')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  async findAllFromUser(@Param('userId') userId: string) : Promise<TransactionEntity[]> {
    return await this.transactionsService.findAllFromUser(+userId);
  }

  @ApiOperation({summary: 'Get all transactions from account'})
  @Get(':userId/:accountId')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  async findAllFromUserAccount(@Param('userId') userId: string, @Param('accountId') accountId: string) : Promise<TransactionEntity[]> {
    return await this.transactionsService.findAllFromUserAccount(+userId, +accountId);
  }

  @ApiOperation({summary: 'Get all (expense or income) transactions'})
  @Get(':userId/:operationType')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  async findAllFromUserWithOperationType(@Param('userId') userId: string, @Param('transactionType') transactionType: OperationType) : Promise<TransactionEntity[]> {
    return await this.transactionsService.findAllFromUserWithOperationType(+userId, transactionType);
  }
  @ApiOperation({summary: 'Get all transactions with category'})
  @Get(':userId/:category')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  async findAllFromUserWithCategory(@Param('userId') userId: string, @Param('category') category: Category) : Promise<TransactionEntity[]> {
    return await this.transactionsService.findAllFromUserWithCategory(+userId, category);
  }

  @ApiOperation({summary: 'Get transaction'})
  @Get(':id')
  @ApiOkResponse({ type: TransactionEntity})
  async findOne(@Param('id') id: string) : Promise<TransactionEntity> {
    return await this.transactionsService.findOne(+id);
  }

  @ApiOperation({summary: 'Edit transaction'})
  @Patch(':id')
  @ApiOkResponse({ type: TransactionEntity})
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) : Promise<TransactionEntity> {
    return await this.transactionsService.update(+id, updateTransactionDto);
  }

  @ApiOperation({summary: 'Delete transaction'})
  @Delete(':id')
  @ApiOkResponse({ type: TransactionEntity})
  async remove(@Param('id') id: string) {
    return await this.transactionsService.remove(+id);
  }
}
