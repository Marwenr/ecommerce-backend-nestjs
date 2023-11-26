import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderProductDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order.product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderEnity: Repository<Order>,
    @InjectRepository(OrderProduct)
    private productEntity: Repository<OrderProduct>,
  ) {}

  private async addProductToOrder(productData) {
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

  async create(createOrderDto: CreateOrderDto) {
    await this.addProductToOrder(
      createOrderDto.orderProduct as OrderProductDto[],
    );
    const cart = this.orderEnity.create(createOrderDto);
    return this.orderEnity.save(cart);
  }

  findAll() {
    return this.orderEnity.find();
  }

  findOne(id: number) {
    return this.orderEnity.findOne({ where: { id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderEnity.preload({
      id,
      ...updateOrderDto,
    });
    if (!order) throw new NotFoundException('This order does not exist');
    return this.orderEnity.save(order);
  }

  async remove(id: number) {
    const userDeleted = await this.orderEnity.delete(id);
    if (userDeleted.affected === 0) {
      throw new NotFoundException('This order does not exist');
    }
  }
}
