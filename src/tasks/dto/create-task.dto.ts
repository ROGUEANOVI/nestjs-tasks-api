import { IsString, IsBoolean, IsNotEmpty, MinLength, IsInt, IsPositive, IsOptional } from 'class-validator';

export class CreateTaskDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsBoolean()
  isCompleted: boolean

  @IsInt()
  @IsPositive()
  project_id: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  user_id: number;
}
