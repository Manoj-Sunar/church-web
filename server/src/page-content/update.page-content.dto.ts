import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

const emptyToUndefined = ({ value }) => (value === '' ? undefined : value);

class HeroImageDto {
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  url?: string;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  publicId?: string;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  alt?: string;
}

class HeroDto {
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  title?: string;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  subtitle?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HeroImageDto)
  image?: HeroImageDto;
}

class MainDto {
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  text?: string;
}

class MissionContentItemDto {
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  missionTitle?: string;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  missionDescription?: string;
}

class AboutDto {
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  mission?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HeroImageDto)
  missionImage?: HeroImageDto;

  // ✅ FIX: removed strict 4 validation
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MissionContentItemDto)
  missionContent?: MissionContentItemDto[];
}

class ContactDto {
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsEmail()
  email?: string;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  phone?: string;

  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  address?: string;
}

class DonateDto {
  @IsOptional()
  @Transform(emptyToUndefined)
  @IsString()
  bankInfo?: string;
}

export class UpdatePageContentDto {
  @IsOptional()
  @IsString()
  pageName?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HeroDto)
  hero?: HeroDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MainDto)
  main?: MainDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AboutDto)
  about?: AboutDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDto)
  contact?: ContactDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DonateDto)
  donate?: DonateDto;
}