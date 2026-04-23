import {
  IsString,
  MinLength,
  MaxLength,
  IsObject,
  IsDateString,
} from "class-validator";

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title!: string;

  @IsString()
  @MinLength(3)
  slug!: string;

  @IsDateString()
  date!: string;

  @IsString()
  @MinLength(3)
  time!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  location!: string;

  @IsString()
  @MinLength(10)
 
  description!: string;

  @IsObject()
  image!: {
    url: string;
    publicId: string;
    alt: string;
  };

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  category!: string;
}