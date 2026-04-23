import {
    IsString,
    MinLength,
    MaxLength,
    IsObject,
    IsOptional,
    IsDateString,
} from "class-validator";

export class CreateMinistryDto {

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name!: string;

    @IsString()
    @MinLength(3)
    slug!: string;

    @IsString()
    @MinLength(3)
    leader!: string;

    @IsObject()
    image!: {
        url: string;
        publicId: string;
        alt:string;
    };

    @IsString()
    @MinLength(10)
  
    description!: string;

    @IsString()
    @MinLength(20)
    longDescription!: string;

    // optional because backend has default
    @IsOptional()
    @IsDateString()
    date?: string;
}