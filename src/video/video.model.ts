import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface VideoCreationAttrs{
    src: string;
    summary: string;
}

@Table({tableName: 'video'})
export class Video extends Model<Video, VideoCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: '1.jpg.2', description: 'путь к видео'})
    @Column({ type: DataType.STRING, allowNull: false })
    src: string;

    @ApiProperty({example: 'Текст', description: 'Краткое содержание'})
    @Column({ type: DataType.STRING})
    summary: string;

}