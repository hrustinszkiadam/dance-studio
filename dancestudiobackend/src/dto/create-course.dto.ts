import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export default class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['solo', 'partner', 'group'])
  type: string;

  @IsNotEmpty()
  @IsString()
  instructor: string;

  @IsNotEmpty()
  @IsInt()
  length: number;
}
