import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
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

  @ApiOperation({summary: 'Delete category'})
  @Delete(':id')
  @ApiOkResponse({ type: Category})
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
