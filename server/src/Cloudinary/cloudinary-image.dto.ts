import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CloudinaryImageDto {
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  publicId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  alt?: string;
}