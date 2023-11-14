import { ApiProperty } from '@nestjs/swagger';
import { IsString  } from 'class-validator';


export class CreateFamilyMemberDto {
  @ApiProperty({example: 'Укропов Александр', description: 'Отношение родства'})
  @IsString({message: 'Должно быть строкой'})
  readonly  fullName : string;

  @ApiProperty({example: '21.06.1986', description: 'год рождения'})
  @IsString({message: 'Должно быть строковым значением'})
  readonly yearOfBirth: string;
  
  }