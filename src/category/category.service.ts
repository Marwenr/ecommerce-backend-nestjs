import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  findOne(title: string) {
    return this.categoryRepository.findOne({
      relations: ['products'],
      where: { title },
    });
  }

  async create(createCategoryDto) {
    const check = await this.categoryRepository.findOne({
      where: { title: createCategoryDto },
    });
    if (check) {
      return check;
    } else {
      const category = this.categoryRepository.create({
        title: createCategoryDto,
      });
      return this.categoryRepository.save(category);
    }
  }
}
