import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { GeminiService } from 'src/common/services/gemini.service';
import { History, HistorySchema } from './schema/history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    UserModule,
  ],
  controllers: [HistoriesController],
  providers: [HistoriesService, GeminiService],
})
export class HistoriesModule {}
