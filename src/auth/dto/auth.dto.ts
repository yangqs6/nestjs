import {
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator';

// class vs interface
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}