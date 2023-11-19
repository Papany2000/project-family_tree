import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Video } from './video.model';
import { CreateVideoDto } from './create-video.dto';


@Injectable()
export class VideoService {
    constructor (@InjectModel(Video) private videoRepository: typeof Video) {}

    async create(dto: CreateVideoDto) {
        const video  = await this.videoRepository.create(dto);
        return video;
      }

      async getAllVideo() {
        const video = await this.videoRepository.findAll();
        return video;
      }

      async getUserByEmail(src: string) {
        const video = await this.videoRepository.findOne({
            where: {src},
        })
        return video
      }
}
