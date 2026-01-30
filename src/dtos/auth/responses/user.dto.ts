import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserDto {
  @Expose()
  readonly id!: number;

  @Expose()
  readonly name!: string;

  @Expose()
  readonly email!: string;

  @Expose()
  readonly role!: string;

  @Expose()
  readonly createdAt!: Date;
}
