import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountType } from 'src/enums/AccountType';
import { CreateAccountDto } from './dto/create-account.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
@ApiTags('account')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/')
  @Render('wallet')
  async getAccounts() {
    const viewData = [];
    viewData['currencies'] = await this.walletService.findAll();
    viewData['accountTypes'] = [AccountType.CURRENT, AccountType.CREDIT, AccountType.DEPOSIT, AccountType.SAVINGS];
    const accounts = await this.walletService.findAllByUserId(1);

    const accountsWithTotalAmount = accounts.map(account => {
      if (account.transactions != null) {
        const totalAmount = account.transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
      }
      const totalAmount = 0;
      return { ...account, totalAmount };
    });
    viewData['accounts'] = accountsWithTotalAmount;
    
    return { viewData: viewData };
  }
  
  @ApiOperation({summary: 'Create account'})
  @Post('/account')
  async create(@Body() body, @Res() response) {
    const accountDto = new CreateAccountDto;
    accountDto.title = body.name;
    accountDto.currency = body.currency;
    accountDto.accountType = body.accountType;

    await this.walletService.create(accountDto);

    return response.redirect('/wallet');
  }

  // @ApiOperation({summary: 'Get account'})
  // @Get(':id')
  // @ApiOkResponse({ type: Account })
  // async findOne(@Param('id') id: string) : Promise<Account> {
  //   return await this.accountsService.findOne(+id);
  // }

  // @ApiOperation({summary: 'Get all user accounts'})
  // @Get(':userId')
  // @ApiOkResponse({ type: Account, isArray: true })
  // async findAllByUserId(@Param('userId') userId: string) : Promise<Account[]> {
  //   return this.accountsService.findAllByUserId(+userId);
  // }

  // @ApiOperation({summary: 'Get all user active accounts'})
  // @Get('active/:userId')
  // @ApiOkResponse({ type: Account, isArray: true })
  // async findAllActiveByUserId(@Param('userId') userId: string) : Promise<Account[]> {
  //   return this.accountsService.findAllActiveByUserId(+userId);
  // }

  // @ApiOperation({summary: 'Edit account info'})
  // @Patch(':id')
  // @ApiOkResponse({ type: Account })
  // async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) : Promise<Account> {
  //   return await this.accountsService.update(+id, updateAccountDto);
  // }

  // @ApiOperation({summary: 'Delete account'})
  // @Delete(':id')
  // @ApiOkResponse({ type: Account })
  // async remove(@Param('id') id: string) {
  //   return await this.accountsService.remove(+id);
  // }
}
