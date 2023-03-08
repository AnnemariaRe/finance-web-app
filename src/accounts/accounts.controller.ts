import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';

@Controller('accounts')
@ApiTags('account')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiCreatedResponse({ type: AccountEntity })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get(':userId')
  @ApiOkResponse({ type: AccountEntity, isArray: true })
  findAllFromUser(@Param('userId') userId: string) {
    return this.accountsService.findAllFromUser(+userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: AccountEntity})
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AccountEntity})
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AccountEntity})
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
