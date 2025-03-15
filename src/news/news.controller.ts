import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('news')
@UseGuards(AuthGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async createNews(@Body() data: any) {
    return await this.newsService.createNews(data);
  }

  @Get()
  async getNews(@Param() param: any) {
    return await this.newsService.getNews(param);
  }

  @Get(':authorId/author')
  async getNewsByAuthorId(@Param('authorId') authorId: string) {
    return await this.newsService.getNewsByAuthorId(authorId);
  }

  @Get(':id/news')
  async getNewsByNewsId(@Param('id') id: string) {
    return await this.newsService.getNewsByNewsId(id);
  }
}
