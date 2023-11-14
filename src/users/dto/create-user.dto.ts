import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";




export class CreateUserDto {
    @ApiProperty({example: 'Papany2000@rambler.ru', description: 'email'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: 'qwer', description: 'пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'не менее 4 и неболее 16 символов'})
    readonly password: string;
}