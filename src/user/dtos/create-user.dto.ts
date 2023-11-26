import { IsString, IsEmail, Length, IsEnum } from 'class-validator';
import { Role } from '../user.interface';

export class CreateUserDto {
  @IsString()
  @Length(3, 10)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly address: string;

  @IsEnum(Role)
  readonly role: Role = Role.User;
}
