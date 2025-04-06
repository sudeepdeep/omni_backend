import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
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
      authorId: data.authorId || '',
      imageUrl: data.imageUrl || [],
      publishedDate: moment().format('YYYY-MM-DD:HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD:HH:mm:ss'),
      modifiedAt: moment().format('YYYY-MM-DD:HH:mm:ss'),
    });

    return await news.save();
  }

  async editNews(id: any, data: any) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteNews(id: any) {
    return await this.model.findByIdAndDelete(id);
  }

  async getNews(filter: any) {
    const query: any = {};

    // Filter for category (Stored as an array, use $in to match any)
    if (filter.category) {
      query.category = {
        $in: Array.isArray(filter.category)
          ? filter.category
          : [filter.category],
      };
    }

    // Filter for subCategory (Stored as an array, use $in to match any)
    if (filter.subCategory) {
      query.subCategory = {
        $in: Array.isArray(filter.subCategory)
          ? filter.subCategory
          : [filter.subCategory],
      };
    }

    if (filter.author) {
      query.author = { $regex: filter.author, $options: 'i' }; // Case-insensitive search
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

    const limit = parseInt(filter.limit) || 10; // Default limit: 10
    const offset = parseInt(filter.offset) || 0; // Default offset: 0

    query.isArchived = 'false';

    const totalCount = await this.model.countDocuments(query); // Get total count

    const news = await this.model
      .find(query)
      .populate({
        path: 'authorId',
        select: 'username email firstName lastName profileUrl role',
      })
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(offset)
      .limit(limit)
      .exec();

    return {
      total: totalCount,
      count: news.length,
      limit,
      offset,
      results: news,
    };
    // return await this.model.find(query).sort({ createdAt: -1 }).exec();
  }

  async getNewsByAuthorId(authorId: any) {
    const authorNews = await this.model.find({ authorId: authorId });
    return authorNews;
  }

  async getNewsByNewsId(newsId: any) {
    const news = await this.model
      .findOne({ _id: newsId })
      .populate({
        path: 'authorId',
        select: 'username email firstName lastName profileUrl role',
      })
      .exec();

    return news;
  }
}
