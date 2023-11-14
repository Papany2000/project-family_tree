import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RelativesService } from './relatives.service';
import { CreateRelativeDto } from './create-relative.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Relative } from './relatives.model';


@ApiTags("Родственники")
@Controller('relatives')
export class RelativesController {
  constructor(private relativesService: RelativesService) { }


  @ApiOperation({ summary: 'Создание родственника' })
  @ApiResponse({ status: 200, type: Relative })
  @Post()
  async createRelatives(@Body() dto: CreateRelativeDto) {
    try {
      return await this.relativesService.create(dto)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }

  }

  @ApiOperation({ summary: 'Получение всех родственников' })
  @ApiResponse({ status: 200, type: Relative })
  @Get()
  getAll() {
    return this.relativesService.getAllRelatives();
  }
}
