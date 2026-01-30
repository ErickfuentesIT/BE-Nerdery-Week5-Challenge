import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignInDto {
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  @MinLength(4)
  readonly password!: string;
}
