import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import TransactionsService from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';
import { OperationType } from 'src/enums/OperationType';

@Controller('transactions')
@ApiTags('transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({summary: 'Create transaction'})
  @Post()
  @ApiCreatedResponse({ type: Transaction })
  async create(@Param('accountId') accountId: string, @Param('categoryId') categoryId: string, @Body() createTransactionDto: CreateTransactionDto) : Promise<Transaction> {
    return await this.transactionsService.create(+accountId, +categoryId, createTransactionDto);
  }

  @ApiOperation({summary: 'Get transaction'})
  @Get(':id')
  @ApiOkResponse({ type: Transaction})
  async findOne(@Param('id') id: string) : Promise<Transaction> {
    return await this.transactionsService.findOne(+id);
  }

  @ApiOperation({summary: 'Get all user transactions'})
  @Get(':userId')
  @ApiOkResponse({ type: Transaction, isArray: true })
  async findAllByUserId(@Param('userId') userId: string) : Promise<Transaction[]> {
    return await this.transactionsService.findAllByUserId(+userId);
  }

  @ApiOperation({summary: 'Get all account transactions'})
  @Get(':accountId')
  @ApiOkResponse({ type: Transaction, isArray: true })
  async findAllByAccountId(@Param('accountId') accountId: string) : Promise<Transaction[]> {
    return await this.transactionsService.findAllByAccountId(+accountId);
  }

  @ApiOperation({summary: 'Get all (expense or income) transactions'})
  @Get(':userId/:operationType')
  @ApiOkResponse({ type: Transaction, isArray: true })
  async findAllFromUserWithOperationType(@Param('userId') userId: string, @Param('transactionType') transactionType: OperationType) : Promise<Transaction[]> {
    return await this.transactionsService.findAllFromUserWithOperationType(+userId, transactionType);
  }

  @ApiOperation({summary: 'Get all transactions in category'})
  @Get(':userId/:category')
  @ApiOkResponse({ type: Transaction, isArray: true })
  async findAllFromUserInCategory(@Param('userId') userId: string, @Param('category') categoryId: string) : Promise<Transaction[]> {
    return await this.transactionsService.findAllFromUserInCategory(+userId, +categoryId);
  }

  @ApiOperation({summary: 'Edit transaction'})
  @Patch(':id')
  @ApiOkResponse({ type: Transaction})
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) : Promise<Transaction> {
    return await this.transactionsService.update(+id, updateTransactionDto);
  }
}
