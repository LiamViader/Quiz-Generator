import { IsString, IsInt, Min, IsIn, Max, IsNotEmpty } from 'class-validator';

export class GeneratorRequestDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsIn(['very easy', 'easy', 'medium', 'hard', 'almost impossible'])
  difficulty: string;

  @IsString()
  @IsIn(['english', 'spanish', 'catalan', 'french', 'italian'])
  language: string;

  @IsString()
  name: string;

  @IsString()
  @IsIn(['public', 'private'])
  privacy: string;

  @IsInt()
  @Min(1)
  @Max(10)
  numberQuestions: number;
}