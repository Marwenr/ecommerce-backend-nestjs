import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartProducts } from './entities/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartProducts])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
