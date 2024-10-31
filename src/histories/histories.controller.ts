import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { CustomRequest, UserGuard } from 'src/user/guards/user.guard';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @UseGuards(UserGuard)
  @Post()
  create(
    @Body() createHistoryDto: CreateHistoryDto,
    @Req() req: CustomRequest,
  ) {
    return this.historiesService.generateHistory({
      ...createHistoryDto,
      author: req.user.id,
    });
  }

  @Get()
  histories() {
    return this.historiesService.getHistories();
  }

  @Get(':id')
  history(@Req() req: CustomRequest) {
    return this.historiesService.getHistory(req.params.id);
  }
}
