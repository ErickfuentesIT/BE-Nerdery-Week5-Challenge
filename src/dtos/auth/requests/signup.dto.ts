import { IsEmail, IsString, Matches } from "class-validator";


export class SignUpDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  readonly name!: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
  })
  readonly password!: string;
}
