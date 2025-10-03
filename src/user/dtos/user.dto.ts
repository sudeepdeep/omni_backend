import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profileUrl: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  userType: string;

  @IsOptional()
  @IsString()
  dateOfJoin: string;

  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  verified: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  licenseNo: string;

  @IsOptional()
  @IsArray()
  purchasedItems: string[];

  @IsOptional()
  @IsArray()
  purchasedItemsWithPaymentIds: string[];

  @IsOptional()
  @IsString()
  premiumUser: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
