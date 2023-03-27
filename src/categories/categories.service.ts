import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

  async create(userId: number, createCategoryDto: CreateCategoryDto) {
    const { name, operationType } = createCategoryDto;
    const user = await this.userRepository.findOne({where: { id: userId}})

    const category = new Category();
    category.user = user;
    category.name = name;
    category.operationType = operationType;

    await this.categoryRepository.save(category);
    return category;
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
