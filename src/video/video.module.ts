import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { Video } from './video.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [VideoService],
  controllers: [VideoController],
  imports: [
    SequelizeModule.forFeature( [Video]),
  ]
})
export class VideoModule {}
