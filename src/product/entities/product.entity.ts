import { Category } from 'src/category/entities/category.entity';
import { OrderProduct } from 'src/order/entities/order.product.entity';
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

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product, {
    eager: true,
  })
  orderProduct: OrderProduct[];
}
