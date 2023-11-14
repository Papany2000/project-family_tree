import { Column, DataType,  HasMany,  Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { FamilyMember } from 'src/family_members/FamilyMembers.model';
import { OneToMany } from "typeorm";

interface RelativeCreationAttrs { 
    kinship: string;                                                     
}

@Table({ tableName: 'relatives' })                                                     
export class Relative extends Model<Relative, RelativeCreationAttrs> {

  @ApiProperty({example: 'id', description: 'идентификатор'})
  @Column({                                                                        
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'Сын', description: 'Отношение родства'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  kinship: string;

  @HasMany(() => FamilyMember)
  public familyMember: FamilyMember[];

}