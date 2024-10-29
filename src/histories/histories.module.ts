import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { GeminiService } from 'src/common/services/gemini.service';

@Module({
  controllers: [HistoriesController],
  providers: [HistoriesService, GeminiService],
})
export class HistoriesModule {}
