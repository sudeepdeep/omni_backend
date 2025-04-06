import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createNews(@Body() data: any) {
    return await this.newsService.createNews(data);
  }

  @Put()
  async editNews(@Body() data: any) {
    const { _id, ...updateData } = data;

    if (!_id) {
      throw new Error('NewsId is required');
    }

    return await this.newsService.editNews(_id, updateData);
  }

  @Delete(':id/news')
  async deleteNews(@Param('id') id: string) {
    if (!id) {
      throw new Error('newsId is required for deletion.');
    }
    return await this.newsService.deleteNews(id);
  }

  @Get()
  async getNews(
    @Query('category') category?: any,
    @Query('author') author?: string,
    @Query('subCategory') subCategory?: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const filters: any = {
      category,
      author,
      subCategory,
      startDate,
      endDate,
      search,
      limit,
      offset,
    };
    return await this.newsService.getNews(filters);
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
