import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './user.interface';
import * as bcrypt from 'bcrypt';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ default: 'user' })
  role: Role;

  @OneToMany(() => Cart, (cart) => cart.user, {
    eager: true,
  })
  cart: Cart[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      const round = bcrypt.getRounds(this.password);
      if (round === 0) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    } catch (error) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
