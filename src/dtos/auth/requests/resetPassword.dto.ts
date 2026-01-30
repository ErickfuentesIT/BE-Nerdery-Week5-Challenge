import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  readonly token!: string;

  @IsNotEmpty()
  @MinLength(4)
  readonly password!: string;
}
