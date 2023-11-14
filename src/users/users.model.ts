import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface UsersCreationAttrs{
    email: string;
    password: string;
    name: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UsersCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'Сергей', description: 'Имя'})
    @Column({ type: DataType.STRING })
    name: string;

    @ApiProperty({example: 'Papany2000@rambler.ru', description: 'mail'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({example: "qwerf", description: 'пороль'})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
}