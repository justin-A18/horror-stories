import { IsOptional, IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  history: string;

  @IsString()
  @IsOptional()
  author: string;
}
