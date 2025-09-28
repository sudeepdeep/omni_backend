import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  profileUrl: string;

  @Prop()
  userType: string;

  @Prop()
  role: string;

  @Prop()
  dateOfJoin: string;

  @Prop()
  companyName: string;

  @Prop()
  address: string;

  @Prop()
  verified: string;

  @Prop()
  licenseNo: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  bio: string;

  @Prop()
  premiumUser?: string;

  @Prop({ default: [] })
  purchasedItems?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hashSync(this.password, salt);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.index({ username: 'text' });
