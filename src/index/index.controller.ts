import { Controller, Get, Post, Body, Res, Render } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperationType } from 'src/enums/OperationType';
import { AccountType } from 'src/enums/AccountType';
import TransactionsService from 'src/services/transactions.service';
import AccountsService from 'src/services/accounts.service';
import CategoriesService from 'src/services/categories.service';
const axios = require('axios');

@Controller('')
@ApiTags('index page')
export class IndexController {
  constructor(private readonly accountsService: AccountsService,
    private readonly categoriesService: CategoriesService,
    private readonly transactionsService: TransactionsService) {}

  @ApiOperation({summary: 'Create transaction'})
  @Post('/transaction')
  async create(@Body() body, @Res() response) {
    const transactionDto = new CreateTransactionDto;
    transactionDto.amount = body.amount;
    transactionDto.date = body.date;
    transactionDto.account = body.account;
    transactionDto.category = body.category;

    await this.transactionsService.create(1, transactionDto);

    return response.redirect('/');
  }

  @ApiOperation({summary: 'Get transactions'})
  @Get('/')
  @Render('index')
  async getTransactions() {
    const viewData = [];
    viewData['accounts'] = await this.accountsService.findAllActiveByUserId(1);
    const categories = await this.categoriesService.findCategoriesByUserId(1);
    viewData['expenseCategories'] = categories.filter(category => category.operationType === OperationType.EXPENSE);
    viewData['incomeCategories'] = categories.filter(category => category.operationType === OperationType.INCOME);
    const transactions = await this.transactionsService.findAllTransactionsByUserId(1);
    viewData['transactions'] = transactions;
    
    const apiKey = 'uB9jmOX6xlypRBtHq65elzi5AZAaUI27vSXSniFo';
    let amountInRUB = 0;
    let totalAmount = 0;
    let totalSavings = 0;
    let monthExpense = 0;
    let monthIncome = 0;
    const now = new Date();

    var data = Array(31).fill(0);
    var xValues = [];

    var today = Number(String(now.getDate()).padStart(2, '0'));
    var month = String(now.getMonth() + 1).padStart(2, '0');

    if (today > 10) {
        var start = today - 9;
        var start2 = today - 9;
    } else {
        var start = 1;
        var start2 = 1;
    }

    for (let i = 0; i < 10; i++) {
        xValues[i] = start;
        start++;
    }

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
            monthExpense += Number(-amountInRUB);

            var day = Number(transaction.date.split('-')[2]);
            if (transaction.date.split('-')[1] == month && day > today - 9) {
                data[day] += Number(-transaction.amount);
            }
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

    viewData['dayValues'] = xValues;
    viewData['chartData'] = data.slice(start2, start2 + 10);

    return { viewData: viewData };
  }
}
