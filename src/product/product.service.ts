import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  findAll() {
    return this.productRepository.find({ relations: ['category'] });
  }

  findOne(id) {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(CreateProductDto: CreateProductDto) {
    const category = await this.categoryService.create(
      CreateProductDto.category,
    );
    const product = this.productRepository.create({
      ...CreateProductDto,
      category,
    });
    return this.productRepository.save(product);
  }

  async update(id, updateProductDto) {
    const updatedProduct = await this.productRepository.preload({
      id: +id,
      ...updateProductDto,
    });
    if (!updatedProduct)
      throw new NotFoundException('This product does not exist');
    return this.productRepository.save(updatedProduct);
  }

  async remove(id) {
    const productDeleted = await this.productRepository.delete(id);
    if (productDeleted.affected === 0) {
      throw new NotFoundException('This product does not exist');
    }
  }
}
