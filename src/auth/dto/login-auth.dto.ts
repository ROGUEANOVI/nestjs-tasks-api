import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  userNameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Transform(({value}) => value.trim())
  password: string;
}