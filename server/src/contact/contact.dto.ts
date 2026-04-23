import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class CreateContactDto {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name!: string

    @IsString()
    @IsEmail()
    email!: string

    @IsString()
    subject!: string

    @IsString()
    messages!: string
}