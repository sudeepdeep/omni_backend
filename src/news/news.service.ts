import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from 'src/schema/news.schema';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private readonly model: Model<any>) {}
  async createNews(data: any) {
    return await this.model.create(data);
  }
}
