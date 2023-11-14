import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Relative } from 'src/relatives/relatives.model';
import { NonAttribute, ForeignKey as ForeignKeyFiled } from 'sequelize';


interface FamilyMemberCreationAttrs { 
  id: number;
  fullName: string;
  yearOfBirth: string;
  foto: string;
  description: string;
  kinshipId: number;
  parentId: number;                                  
}

@Table({ tableName: 'familemembers' })                                                     
export class FamilyMember extends Model<FamilyMemberCreationAttrs> {

  @ApiProperty({example: 'id', description: 'идентификатор'})
  @Column({                                                                        
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'Укропов Анатолий Сергеевич', description: 'родственник'})
  @Column({ type: DataType.STRING})
  fullName: string;

  @ApiProperty({example: '21.06.1986', description: 'год рождения'})
  @Column({ type: DataType.STRING })
  yearOfBirth: string;

  @ApiProperty({example: 'https://yandex.ru/images', description: 'фотография'})
  @Column({ type: DataType.STRING})
  foto: string;

  @ApiProperty({example: 'информация о родственнике', description: 'краткие данные'})
  @Column({ type: DataType.STRING})
  description: string;

  @ApiProperty({example: '2', description: 'идентификатор родства'})
  @Column(DataType.INTEGER)
  parentId: number;

  @ApiProperty({example: 'Родство', description: 'идентификатор'})
  @ForeignKey(() => Relative)

  @Column(DataType.INTEGER)
  public kinshipId: ForeignKeyFiled<Relative['id']>;

  @BelongsTo(() => Relative)
  public kinship: NonAttribute<Relative>;

}