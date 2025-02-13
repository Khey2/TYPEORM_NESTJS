import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class UserDto {

    @IsInt()
    @IsOptional()
    userId?: number;

    @IsString()
    @MinLength(2)
    username: string;

    @IsString()
    password: string;

}
