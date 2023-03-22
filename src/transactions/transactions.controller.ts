import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
@ApiTags('transaction')
export class TransactionsController {
  // constructor(private readonly transactionsService: TransactionsService) {}

  // @ApiOperation({summary: 'Create transaction'})
  // @Post()
  // @ApiCreatedResponse({ type: Transaction })
  // async create(@Body() createTransactionDto: CreateTransactionDto) : Promise<Transaction> {
  //   return await this.transactionsService.create(createTransactionDto);
  // }

  // @ApiOperation({summary: 'Get all user transactions'})
  // @Get(':userId')
  // @ApiOkResponse({ type: Transaction, isArray: true })
  // async findAllFromUser(@Param('userId') userId: string) : Promise<Transaction[]> {
  //   return await this.transactionsService.findAllFromUser(+userId);
  // }

  // @ApiOperation({summary: 'Get all transactions from account'})
  // @Get(':userId/:accountId')
  // @ApiOkResponse({ type: Transaction, isArray: true })
  // async findAllFromUserAccount(@Param('userId') userId: string, @Param('accountId') accountId: string) : Promise<Transaction[]> {
  //   return await this.transactionsService.findAllFromUserAccount(+userId, +accountId);
  // }

  // @ApiOperation({summary: 'Get all (expense or income) transactions'})
  // @Get(':userId/:operationType')
  // @ApiOkResponse({ type: Transaction, isArray: true })
  // async findAllFromUserWithOperationType(@Param('userId') userId: string, @Param('transactionType') transactionType: OperationType) : Promise<Transaction[]> {
  //   return await this.transactionsService.findAllFromUserWithOperationType(+userId, transactionType);
  // }

  // @ApiOperation({summary: 'Get transaction'})
  // @Get(':id')
  // @ApiOkResponse({ type: Transaction})
  // async findOne(@Param('id') id: string) : Promise<Transaction> {
  //   return await this.transactionsService.findOne(+id);
  // }

  // @ApiOperation({summary: 'Edit transaction'})
  // @Patch(':id')
  // @ApiOkResponse({ type: Transaction})
  // async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) : Promise<Transaction> {
  //   return await this.transactionsService.update(+id, updateTransactionDto);
  // }

  // @ApiOperation({summary: 'Delete transaction'})
  // @Delete(':id')
  // @ApiOkResponse({ type: Transaction})
  // async remove(@Param('id') id: string) {
  //   return await this.transactionsService.remove(+id);
  // }
}
