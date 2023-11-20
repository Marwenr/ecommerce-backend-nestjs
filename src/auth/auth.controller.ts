import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './roles/roles.decorator';
import { Role } from 'src/user/user.interface';
import { JwtAuthGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  signIn(@Body() userAuth: SignInDto) {
    return this.authService.signIn(userAuth);
  }

  @Get()
  @Roles(Role.Admin, Role.Manager, Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  refrechToken(@Request() request) {
    return this.authService.refrechToken(request.user);
  }
}
