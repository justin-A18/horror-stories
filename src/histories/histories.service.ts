import { GeminiService } from 'src/common/services/gemini.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoriesService {
  constructor(private readonly geminiService: GeminiService) {}

  generateHistory(createHistoryDto: CreateHistoryDto) {
    return this.geminiService.generateText(createHistoryDto.history);
  }
}
