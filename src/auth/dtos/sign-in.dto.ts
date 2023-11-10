import { IsString, IsEmail } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { each: true })
  readonly email: string;

  @IsString()
  readonly password: string;
}
