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
  async create(@Body() createTransactionDto: CreateTransactionDto) : Promise<TransactionEntity> {
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get(':userId')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  async findAllFromUser(@Param('userId') userId: string) : Promise<TransactionEntity[]> {
    return await this.transactionsService.findAllFromUser(+userId);
  }

  @Get(':userId/:accountId')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  async findAllFromUserAccount(@Param('userId') userId: string, @Param('accountId') accountId: string) : Promise<TransactionEntity[]> {
    return await this.transactionsService.findAllFromUserAccount(+userId, +accountId);
  }

  @Get(':userId/:operationType')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  async findAllFromUserWithOperationType(@Param('userId') userId: string, @Param('transactionType') transactionType: OperationType) : Promise<TransactionEntity[]> {
    return await this.transactionsService.findAllFromUserWithOperationType(+userId, transactionType);
  }

  @Get(':userId/:category')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  async findAllFromUserWithCategory(@Param('userId') userId: string, @Param('category') category: Category) : Promise<TransactionEntity[]> {
    return await this.transactionsService.findAllFromUserWithCategory(+userId, category);
  }

  @Get(':id')
  @ApiOkResponse({ type: TransactionEntity})
  async findOne(@Param('id') id: string) : Promise<TransactionEntity> {
    return await this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TransactionEntity})
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) : Promise<TransactionEntity> {
    return await this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TransactionEntity})
  async remove(@Param('id') id: string) {
    return await this.transactionsService.remove(+id);
  }
}
