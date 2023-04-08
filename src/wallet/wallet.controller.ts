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
      let totalAmount = 0;
      if (account.transactions != null) {
        for (const transaction of account.transactions) {
          totalAmount += Number(transaction.amount); 
        }
      } 
      
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
}
