import { Controller, Get, Post, Body, Res, Render } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperationType } from 'src/enums/OperationType';
import IndexService from './index.service';
import { AccountType } from 'src/enums/AccountType';
const axios = require('axios');

@Controller('')
@ApiTags('transaction')
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @ApiOperation({summary: 'Create transaction'})
  @Post('/transaction')
  async create(@Body() body, @Res() response) {
    const transactionDto = new CreateTransactionDto;
    transactionDto.amount = body.amount;
    transactionDto.date = body.date;
    transactionDto.account = body.account;
    transactionDto.category = body.category;

    await this.indexService.create(1, transactionDto);

    return response.redirect('/');
  }

  @ApiOperation({summary: 'Get transaction'})
  @Get('/')
  @Render('index')
  async findOne() {
    const viewData = [];
    viewData['accounts'] = await this.indexService.findAllActiveByUserId(1);
    const categories = await this.indexService.findCategoriesByUserId(1);
    viewData['expenseCategories'] = categories.filter(category => category.operationType === OperationType.EXPENSE);
    viewData['incomeCategories'] = categories.filter(category => category.operationType === OperationType.INCOME);
    const transactions = await this.indexService.findAllTransactionsByUserId(1);
    viewData['transactions'] = transactions;
    
    const apiKey = 'uB9jmOX6xlypRBtHq65elzi5AZAaUI27vSXSniFo';
    let amountInRUB = 0;
    let totalAmount = 0;
    let totalSavings = 0;
    let monthExpense = 0;
    let monthIncome = 0;
    const now = new Date();

    for (const transaction of transactions) {
      const currency = transaction.account.currency.code;

      if (currency != 'RUB') {
        const response = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=RUB&base_currency=&{currency}`);
        const exchangeRate = response.data.data["RUB"].value;
        amountInRUB = transaction.amount * exchangeRate;

        totalAmount += amountInRUB;
      } else {
        amountInRUB = transaction.amount;
        totalAmount += Number(amountInRUB);
      }

      if (transaction.account.accountType == AccountType.SAVINGS) {
        totalSavings += Number(amountInRUB);
      }

      if (transaction.date.substring(0, 4) == now.toLocaleDateString().substring(4, 8) &&
          transaction.date.substring(6, 7) == now.toLocaleDateString().substring(0, 1)) {
            if (transaction.category.operationType == OperationType.EXPENSE) {
              monthExpense += Number(amountInRUB);
            } else {
              monthIncome += Number(amountInRUB);
            }
          }
    }
    viewData['totalAmount'] = totalAmount.toFixed(2);
    viewData['totalSavings'] = totalSavings.toFixed(2);
    viewData['availableNow'] = (totalAmount - totalSavings).toFixed(2);
    viewData['monthExpense'] = monthExpense.toFixed(2);
    viewData['monthIncome'] = monthIncome.toFixed(2);

    return { viewData: viewData };
  }
}
