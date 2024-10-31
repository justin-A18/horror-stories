import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { GeminiService } from 'src/common/services/gemini.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { History } from './schema/history.schema';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<History>,
    private readonly geminiService: GeminiService,
  ) {}

  async generateHistory(createHistoryDto: CreateHistoryDto) {
    const history = await this.geminiService.generateText(
      createHistoryDto.history,
    );

    const newHistory = new this.historyModel({
      ...history,
      author: createHistoryDto.author,
    });

    await newHistory.save();

    return {
      message: 'History generated successfully',
    };
  }

  async getHistories() {
    return this.historyModel.find().populate('author');
  }

  async getHistory(id: string) {
    return this.historyModel.findById(id).populate('author');
  }
}
