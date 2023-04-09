import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperationType } from 'src/enums/OperationType';
import TransactionsService from 'src/services/transactions.service';
const axios = require('axios');

@Controller('history')
@ApiTags('history page')
export class HistoryController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/')
  @Render('history')
  async getTransactions() {
    const viewData = [];
    const transactions = await this.transactionsService.findAllTransactionsByUserId(1);
    viewData['transactions'] = transactions;
    
    const expensesByCategory = {};
    const incomesByCategory = {};      
    let amountInRUB = 0;
    const apiKey = 'uB9jmOX6xlypRBtHq65elzi5AZAaUI27vSXSniFo';
    const now = new Date();

    for (const transaction of transactions) {
      const currency = transaction.account.currency.code;

      if (currency != 'RUB') {
        const response = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=RUB&base_currency=&{currency}`);
        const exchangeRate = response.data.data["RUB"].value;
        amountInRUB = transaction.amount * exchangeRate;
      } else {
        amountInRUB = transaction.amount;
      }

      if (transaction.date.substring(0, 4) == now.toLocaleDateString().substring(4, 8) &&
          transaction.date.substring(6, 7) == now.toLocaleDateString().substring(0, 1)) {
        
        const category = transaction.category.name; 
        if (transaction.category.operationType == OperationType.EXPENSE) {
          if (category in expensesByCategory) {
            expensesByCategory[category] += Number(-amountInRUB);
          } else {
            expensesByCategory[category] = Number(-amountInRUB);
          }
        } else {
          if (category in incomesByCategory) {
            incomesByCategory[category] += Number(amountInRUB);
          } else {
            incomesByCategory[category] = Number(amountInRUB);
          }
        }
      }
    }

    const expenseCategories = Object.keys(expensesByCategory);
    const expenseValues = Object.values(expensesByCategory);
    const incomeCategories = Object.keys(incomesByCategory);
    const incomeValues = Object.values(incomesByCategory);
  
    viewData['expense_xValues'] = expenseCategories;
    viewData['expense_yValues'] = expenseValues;
    viewData['expenseLength'] = expenseValues.length;
    viewData['income_xValues'] = incomeCategories;
    viewData['income_yValues'] = incomeValues;
    viewData['incomeLength'] = incomeValues.length;

    return { viewData: viewData };
  }
}
