import { Expose, Type } from "class-transformer";
import { UserDto } from "./user.dto";

export class AuthResponseDto {
  @Expose()
  @Type(() => UserDto)
  readonly user!: UserDto;
  @Expose()
  readonly token!: string;
}
