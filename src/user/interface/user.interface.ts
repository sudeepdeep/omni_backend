import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly password: string;
  readonly role: string;
  readonly profileUrl: string;
  readonly userType: string;
  readonly dateOfJoin: string;
  readonly companyName: string;
  readonly address: string;
  readonly verified: string;
  readonly bio: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly licenseNo: string;
}
