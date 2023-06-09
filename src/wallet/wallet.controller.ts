import { Body, Controller, Get, Post, Render, Res, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Account } from 'src/entities/account.entity';
import { AccountType } from 'src/enums/AccountType';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import AccountsService from 'src/services/accounts.service';
import { CurrenciesService } from 'src/services/currencies.service';
import { CreateAccountDto } from '../dto/create-account.dto';

@Controller('wallet')
@ApiTags('wallet page')
export class WalletController {
  constructor(private readonly accountsService: AccountsService,
    private readonly currenciesService: CurrenciesService) {}

  @Get('/')
  @UseFilters(new HttpExceptionFilter())
  @Render('wallet')
  async getAccounts() {
    const viewData = [];
    viewData['currencies'] = await this.currenciesService.findAll();
    viewData['accountTypes'] = [AccountType.CURRENT, AccountType.CREDIT, AccountType.DEPOSIT, AccountType.SAVINGS];
    const accounts = await this.accountsService.findAllByUserId(1);

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
  
  @Post('/account')
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() body, @Res() response) {
    const accountDto = new CreateAccountDto;
    accountDto.title = body.name;
    accountDto.currency = body.currency;
    accountDto.accountType = body.accountType;

    await this.accountsService.create(accountDto);

    return response.redirect('/wallet');
  }
}
