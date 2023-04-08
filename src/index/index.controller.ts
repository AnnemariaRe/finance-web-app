import { Controller, Get, Post, Body, Patch, Param, Res, Render } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperationType } from 'src/enums/OperationType';
import IndexService from './index.service';

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
    viewData['transactions'] = await this.indexService.findAllTransactionsByUserId(1);
    
    return { viewData: viewData };
  }
}
