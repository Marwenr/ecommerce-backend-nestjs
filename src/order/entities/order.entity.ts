import { UserEntity } from 'src/user/user.entity';
import { OrderProduct } from './order.product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
  Failed = 'failed',
}

export enum Payment {
  Cash = 'Cash',
  Online = 'Online',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.order)
  user: UserEntity;

  @JoinTable()
  @OneToMany(() => OrderProduct, (product) => product.order, {
    cascade: true,
    eager: true,
  })
  orderProduct: OrderProduct[];

  @Column({ default: Status.Pending })
  status: Status;

  @Column()
  total: number;

  @Column({ default: Payment.Cash })
  payment: Payment;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
