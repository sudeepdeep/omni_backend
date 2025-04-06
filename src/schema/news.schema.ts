import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class News {
  @Prop({
    required: true,
    type: [String],
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
  category: string[];

  @Prop({
    required: true,
    type: [String],
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
  subCategory: string[];

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  publishedDate?: string;

  @Prop({ default: [] })
  imageUrl?: string[];

  @Prop({ default: 'Anonymous' })
  author?: string;

  @Prop({ default: false })
  isArchived?: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  authorId?: mongoose.Schema.Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  modifiedAt?: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);

NewsSchema.virtual('authorDetails', {
  ref: 'User',
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
});

NewsSchema.index({ category: 1 });
NewsSchema.index({ subCategory: 1 });
NewsSchema.index({ publishedDate: -1 });
