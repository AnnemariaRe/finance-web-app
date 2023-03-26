import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
@ApiTags('category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @ApiOperation({summary: 'Create category'})
  @Post()
  @ApiCreatedResponse({ type: Category })
  async create(@Body() createCategoryDto: CreateCategoryDto) : Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({summary: 'Get category'})
  @Get(':id')
  @ApiOkResponse({ type: Category})
  findOne(@Param('id') id: string) : Promise<Category> {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({summary: 'Get all category transactions'})
  @Get('transactions/:id')
  @ApiOkResponse({ type: Transaction })
  findAllTransactions(@Param('id') id: string) : Promise<Transaction[]> {
    return this.categoryService.findAllTransactions(+id);
  }

  @ApiOperation({summary: 'Delete category'})
  @Delete(':id')
  @ApiOkResponse({ type: Category })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
