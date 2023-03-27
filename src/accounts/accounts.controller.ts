import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({ type: [CreateAccountDto] })
  @ApiCreatedResponse({ type: Account })
  async create(@Param('userId') userId: string, @Param('currencyId') currencyId: string, @Body() createAccountDto: CreateAccountDto) : Promise<Account> {
    return await this.accountsService.create(+userId, +currencyId, createAccountDto);
  }

  @ApiOperation({summary: 'Get account'})
  @Get(':id')
  @ApiOkResponse({ type: Account })
  async findOne(@Param('id') id: string) : Promise<Account> {
    return await this.accountsService.findOne(+id);
  }

  @ApiOperation({summary: 'Get all user accounts'})
  @Get(':userId')
  @ApiOkResponse({ type: Account, isArray: true })
  async findAllByUserId(@Param('userId') userId: string) : Promise<Account[]> {
    return this.accountsService.findAllByUserId(+userId);
  }

  @ApiOperation({summary: 'Get all user active accounts'})
  @Get('active/:userId')
  @ApiOkResponse({ type: Account, isArray: true })
  async findAllActiveByUserId(@Param('userId') userId: string) : Promise<Account[]> {
    return this.accountsService.findAllActiveByUserId(+userId);
  }

  @ApiOperation({summary: 'Edit account info'})
  @Patch(':id')
  @ApiOkResponse({ type: Account })
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) : Promise<Account> {
    return await this.accountsService.update(+id, updateAccountDto);
  }

  @ApiOperation({summary: 'Delete account'})
  @Delete(':id')
  @ApiOkResponse({ type: Account })
  async remove(@Param('id') id: string) {
    return await this.accountsService.remove(+id);
  }
}
