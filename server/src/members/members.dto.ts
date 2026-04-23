import {
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
    IsObject,
    IsDateString,
} from "class-validator";

export class CreateMemberDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name!: string;


    @IsString()
   
    phone!: string;

    @IsDateString()
    join_date!: string;

    @IsOptional()
    @IsObject()
    image?: {
        url: string;
        publicId: string;
        alt: string;
    };
}