import {
  IsString,
  IsNotEmpty,
  MinLength,
  
  IsUrl,
  Matches,
  IsDateString,
} from 'class-validator';

export class CreateSermonDto {
  @IsString()
  @IsNotEmpty({message:"Sermon title is required"})
  @MinLength(10,{message:"at least 10 characters needs"})
 
  title!: string;

  @IsString()
  @IsNotEmpty({message:"Sermon slug is required"})
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be URL-friendly (lowercase, hyphens only)',
  })
  slug!: string;

  @IsString()
  @IsNotEmpty({message:"Sermon Speaker name is required"})
  speaker!: string;

  @IsString()
  @IsNotEmpty({message:"Sermon video url is required"})
  @IsUrl({}, { message: 'Invalid video URL' })
  videoUrl!: string;

  @IsString()
  @IsNotEmpty({message:"Sermon description is required"})
  @MinLength(20,{message:"at least 20 characters is need"})
  description!: string;

  @IsDateString({}, { message: 'Invalid date format (use ISO format)' })
  @IsNotEmpty({message:"Sermon date is required"})
  date!: string;
}