import { CartProducts } from 'src/cart/entities/cart-product.entity';
import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => CartProducts, (CartProducts) => CartProducts.product, {
    eager: true,
  })
  cartProducts: CartProducts[];
}
