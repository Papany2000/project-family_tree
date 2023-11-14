import { Module } from '@nestjs/common';
import { RelativesService } from './relatives.service';
import { RelativesController } from './relatives.controller';
import { Relative } from './relatives.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [RelativesService],
  controllers: [RelativesController],
  imports: [SequelizeModule.forFeature([Relative])],
})
export class RelativesModule {}
