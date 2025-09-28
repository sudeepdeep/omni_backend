import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class GoogleAuthDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsString()
  @IsOptional()
  token_type?: string;

  @IsNumber()
  @IsOptional()
  expires_in?: number;

  @IsString()
  @IsOptional()
  scope?: string;
}
