import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from 'src/schema/news.schema';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private readonly model: Model<any>) {}
  async createNews(data: any) {
    const existingNews = await this.model.findOne({ title: data.title });
    if (existingNews) {
      throw new Error('A news article with this title already exists.');
    }

    const news = new this.model({
      title: data.title,
      content: data.content,
      category: data.category,
      subCategory: data.subCategory,
      author: data.author || 'Anonymous',
      imageUrl: data.imageUrl || [],
    });

    return await news.save();
  }

  async getNews(filter: any) {
    const query: any = {};

    if (filter.category) {
      query.category = filter.category;
    }

    if (filter.author) {
      query.author = { $regex: filter.author, $options: 'i' }; // Case-insensitive search
    }

    if (filter.subCategory) {
      query.subCategory = filter.subCategory;
    }

    if (filter.startDate && filter.endDate) {
      query.createdAt = {
        $gte: new Date(filter.startDate),
        $lte: new Date(filter.endDate),
      };
    }

    if (filter.search) {
      query.$or = [
        { title: { $regex: filter.search, $options: 'i' } },
        { content: { $regex: filter.search, $options: 'i' } },
      ];
    }
    return await this.model.find(query).sort({ createdAt: -1 }).exec();
  }

  async getNewsByAuthorId(authorId: any) {
    const authorNews = await this.model.find({ authorId: authorId });
    return authorNews;
  }

  async getNewsByNewsId(newsId: any) {
    const news = await this.model.findOne({ _id: newsId });

    return news;
  }
}
