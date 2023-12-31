import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':title')
  findOne(@Param('title') title: string) {
    return this.categoryService.findOne(title);
  }
}
