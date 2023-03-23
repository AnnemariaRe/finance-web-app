import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Controller('accounts')
@ApiTags('account')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiOperation({summary: 'Create account'})
  @Post()
  @ApiCreatedResponse({ type: Account })
  async create(@Body() createAccountDto: CreateAccountDto) : Promise<Account> {
    return await this.accountsService.create(createAccountDto);
  }

  @ApiOperation({summary: 'Get all account transactions'})
  @Get('transactions/:id')
  @ApiOkResponse({ type: Account})
  async findAllTransactions(@Param('id') id: string) : Promise<Transaction[]> {
    return await this.accountsService.findAllTransactions(+id);
  }

  @ApiOperation({summary: 'Get account'})
  @Get(':id')
  @ApiOkResponse({ type: Account})
  async findOne(@Param('id') id: string) : Promise<Account> {
    return await this.accountsService.findOne(+id);
  }

  @ApiOperation({summary: 'Edit account info'})
  @Patch(':id')
  @ApiOkResponse({ type: Account})
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) : Promise<Account> {
    return await this.accountsService.update(+id, updateAccountDto);
  }

  @ApiOperation({summary: 'Delete account'})
  @Delete(':id')
  @ApiOkResponse({ type: Account})
  async remove(@Param('id') id: string) {
    return await this.accountsService.remove(+id);
  }
}
