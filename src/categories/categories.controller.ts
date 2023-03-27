import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  async create(@Param('userId') userId: string, @Body() createCategoryDto: CreateCategoryDto) : Promise<Category> {
    return await this.categoryService.create(+userId, createCategoryDto);
  }

  @ApiOperation({summary: 'Get category'})
  @Get(':id')
  @ApiOkResponse({ type: Category})
  findOne(@Param('id') id: string) : Promise<Category> {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({summary: 'Get all user categories'})
  @Get(':userId')
  @ApiOkResponse({ type: Category, isArray: true })
  async findAllByUserId(@Param('userId') userId: string) : Promise<Category[]> {
    return await this.categoryService.findAllByUserId(+userId);
  }

  @ApiOperation({summary: 'Delete category'})
  @Delete(':id')
  @ApiOkResponse({ type: Category })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
