import { Controller, Post, Body, HttpException, HttpStatus, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Video } from './video.model';
import { CreateVideoDto } from './create-video.dto';
import { VideoService } from './video.service';



@ApiTags("Видео")
@Controller('video')
export class VideoController {
    constructor(private videoService: VideoService) { }

    @ApiOperation({ summary: 'Создание видео' })
    @ApiResponse({ status: 200, type: Video })
    @Post()
    async createVideo(@Body() dto: CreateVideoDto) {
      try {
        return await this.videoService.create(dto)
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        }, HttpStatus.FORBIDDEN, {
          cause: error
        });
      }
  
    }

    @ApiOperation({ summary: 'Получение  видео' })
    @ApiResponse({ status: 200, type: Video })
    @Get()
    getAll() {
      return this.videoService.getAllVideo();
    }
}



