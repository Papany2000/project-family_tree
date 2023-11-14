import { ApiProperty } from '@nestjs/swagger';

export class CreateRelativeDto {
  @ApiProperty({example: 'Сын', description: 'Отношение родства'})
  readonly  kinship : string;
  }
  