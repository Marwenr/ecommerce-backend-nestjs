import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userData) {
    const user = await this.userService.findByEmail(userData.email);
    const check = this.checkPassword(userData.password, user?.password);
    if (!check) {
      throw new UnauthorizedException('Email or Password is invalid');
    }
    delete user.password;
    const token = await this.jwtService.signAsync({ ...user });
    return { token, user };
  }

  async checkPassword(password, userPass) {
    return await bcrypt.compare(password, userPass);
  }
}
