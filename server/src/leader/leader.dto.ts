import {
  IsString,
  MinLength,
  MaxLength,
  IsObject,
  IsNumber,
} from "class-validator";

export class CreateLeaderDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  role!: string;

  @IsString()
  @MinLength(10)
  
  bio!: string;

  @IsObject()
  image!: {
    url: string;
    publicId: string;
    alt: string;
  };

  @IsNumber()
  order_index!: number;
}