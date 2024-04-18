import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsOptional()
  description?: string;
}
