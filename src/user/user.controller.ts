import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from './user.interface';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.Manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  find(): Promise<UserEntity[]> {
    return this.userService.find();
  }

  @Get(':id')
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Post('admin')
  @Roles(Role.Manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  createAdmin(@Body() user: CreateUserDto) {
    return this.userService.createAdmin(user);
  }

  @Patch(':id')
  @Roles(Role.Manager, Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
