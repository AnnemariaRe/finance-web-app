import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, operationType } = createCategoryDto;

    const category = new Category();
    category.name = name;
    category.operationType = operationType;

    await this.categoryRepository.save(category);
    return category;
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
