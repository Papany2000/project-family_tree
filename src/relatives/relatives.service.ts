import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Relative } from './relatives.model';
import { CreateRelativeDto } from './create-relative.dto';

@Injectable()
export class RelativesService {
    // внедряем модель Relative
    constructor (@InjectModel(Relative) private relativeRepository: typeof Relative) {}
    // создаём родственника
    async create(dto: CreateRelativeDto) {
        const relative  = await this.relativeRepository.create(dto);
        return relative;
      }
    // получаем всех родственников
      async getAllRelatives() {
        const relatives = await this.relativeRepository.findAll();
        return relatives;
      }

}
     