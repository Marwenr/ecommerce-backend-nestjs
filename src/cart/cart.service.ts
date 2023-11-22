import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto, CartProductDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartProducts } from './entities/cart-product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartEntity: Repository<Cart>,
    @InjectRepository(CartProducts)
    private productEntity: Repository<CartProducts>,
  ) {}

  private async addProductToCart(productData) {
    const check = await this.productEntity.findOne({
      where: { productId: productData.productId },
    });
    if (check) {
      return check;
    } else {
      const productCart = this.productEntity.create(productData);
      return this.productEntity.save(productCart);
    }
  }

  async create(createCartDto: CreateCartDto) {
    await this.addProductToCart(createCartDto.cartProducts as CartProductDto[]);
    const cart = this.cartEntity.create({ ...createCartDto });
    return this.cartEntity.save(cart);
  }

  findAll() {
    return this.cartEntity.find();
  }

  findOne(id: number) {
    return this.cartEntity.findOne({
      where: { id },
    });
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.cartEntity.preload({
      id,
      ...updateCartDto,
    });
    if (!cart) throw new NotFoundException('This cart does not exist');
    return this.cartEntity.save(cart);
  }

  async remove(id: number) {
    const userDeleted = await this.cartEntity.delete(id);
    if (userDeleted.affected === 0) {
      throw new NotFoundException('This cart does not exist');
    }
  }
}
