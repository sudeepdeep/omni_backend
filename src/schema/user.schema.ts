import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema()
export class TenantId extends Document {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  tenantName: string;

  @Prop({ required: true })
  tenantAddress: string;
}

export const TenantIdSchema = SchemaFactory.createForClass(TenantId);

@Schema()
export class User {
  @Prop({ required: true, unique: true })
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
  address: string;

  @Prop()
  aadharNumber: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  employeeId: string;

  @Prop({ type: [TenantIdSchema], default: [] })
  tenantIds: TenantId[];
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
