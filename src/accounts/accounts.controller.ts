import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Controller('accounts')
@ApiTags('account')
export class AccountsController {
  // constructor(private readonly accountsService: AccountsService) {}

  // @ApiOperation({summary: 'Create account'})
  // @Post()
  // @ApiCreatedResponse({ type: AccountEntity })
  // async create(@Body() createAccountDto: CreateAccountDto) : Promise<AccountEntity> {
  //   return await this.accountsService.create(createAccountDto);
  // }

  // @ApiOperation({summary: 'Get all user accounts'})
  // @Get(':userId')
  // @ApiOkResponse({ type: AccountEntity, isArray: true })
  // async findAllFromUser(@Param('userId') userId: string) : Promise<AccountEntity[]> {
  //   return this.accountsService.findAllFromUser(+userId);
  // }

  // @ApiOperation({summary: 'Get account'})
  // @Get(':id')
  // @ApiOkResponse({ type: AccountEntity})
  // async findOne(@Param('id') id: string) : Promise<AccountEntity> {
  //   return await this.accountsService.findOne(+id);
  // }

  // @ApiOperation({summary: 'Edit account info'})
  // @Patch(':id')
  // @ApiOkResponse({ type: AccountEntity})
  // async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) : Promise<AccountEntity> {
  //   return await this.accountsService.update(+id, updateAccountDto);
  // }

  // @ApiOperation({summary: 'Delete account'})
  // @Delete(':id')
  // @ApiOkResponse({ type: AccountEntity})
  // async remove(@Param('id') id: string) {
  //   return await this.accountsService.remove(+id);
  // }
}
