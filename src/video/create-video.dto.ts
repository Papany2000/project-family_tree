import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";




export class CreateVideoDto {
    @ApiProperty({example: '1.jpg.2', description: 'путь к видео'})
    @IsString({message: 'Должно быть строкой'})
    readonly src: string;

    @ApiProperty({example: 'Текст', description: 'краткое описание'})
    @IsString({message: 'Должно быть строкой'})
    readonly summary: string;
}