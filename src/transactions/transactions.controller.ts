import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import TransactionsService from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';

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

  @ApiOperation({summary: 'Edit transaction'})
  @Patch(':id')
  @ApiOkResponse({ type: Transaction})
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) : Promise<Transaction> {
    return await this.transactionsService.update(+id, updateTransactionDto);
  }
}
