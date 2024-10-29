import { IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  history: string;
}
