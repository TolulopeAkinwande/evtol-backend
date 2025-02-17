import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
export class createUserDto{
    @IsNotEmpty()
    @IsString()
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @IsEmail()
    @IsString()
    email!: string

    @IsNotEmpty()
    @IsString()
    password!: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber!: string
}

export class LoginDto{
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}
