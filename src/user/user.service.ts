import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Role } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async find(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(CreateUser: CreateUserDto): Promise<UserEntity> {
    const check = await this.findByEmail(CreateUser.email);
    if (check) {
      throw new BadRequestException('This email is already exist');
    }
    const user = this.userRepository.create(CreateUser);
    const current = await this.userRepository.save(user);
    delete current?.password;
    return current;
  }

  async createUser(CreateUser) {
    if (CreateUser.role !== Role.User) throw new ForbiddenException();
    return this.create(CreateUser);
  }

  async createAdmin(CreateUser) {
    if (CreateUser.role !== Role.Admin) throw new ForbiddenException();
    return this.create(CreateUser);
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<UserEntity> {
    const updatedUser = await this.userRepository.preload({
      id: +id,
      ...updateUser,
    });
    if (!updatedUser) throw new NotFoundException('This user does not exist');
    return this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const userDeleted = await this.userRepository.delete(id);
    if (userDeleted.affected === 0) {
      throw new NotFoundException('This user does not exist');
    }
  }
}
