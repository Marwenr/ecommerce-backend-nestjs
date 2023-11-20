import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/user/user.interface';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @Roles(Role.Admin, Role.Manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Manager, Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Manager, Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
