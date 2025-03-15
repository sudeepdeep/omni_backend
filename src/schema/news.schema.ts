import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class News {
  @Prop({
    required: true,
    enum: [
      'local',
      'state',
      'national',
      'international',
      'stocks',
      'sports',
      'business',
      'politics',
      'technology',
      'entertainment',
      'crypto',
      'economy',
      'law',
      'defense',
      'science',
      'cybersecurity',
      'fashion',
      'lifestyle',
      'gaming',
      'football',
      'cricket',
      'tennis',
      'education',
      'health',
      'accidents',
      'environment',
      'artificialintelligence',
      'examinations',
      'isro',
      'nasa',
      'space',
      'socialmedia',
      'application',
    ],
  })
  category: string;

  @Prop({
    required: true,
    enum: [
      'breaking', // Urgent and major news happening now
      'trending', // Popular and viral news
      'upcoming', // Future events or expected news
      'exclusive', // Special reports, investigative journalism
      'opinion', // Editorials, expert analysis, opinions
      'interview', // Interviews with famous personalities
      'analysis', // Deep dive, research-based news
      'feature', // In-depth stories, human interest
      'alert', // Warnings, advisories, urgent updates
      'special-report', // Detailed coverage on major topics
    ],
  })
  subCategory: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  publishedDate: string;

  @Prop()
  imageUrl: string[];

  @Prop({ default: 'Anonymous' })
  author: string;

  @Prop()
  authorId: string;

  @Prop()
  createdAt: string;

  @Prop()
  modifiedAt: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);

NewsSchema.index({ username: 'text' });
