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

  @IsEnum(Role)
  readonly role: Role;
}
