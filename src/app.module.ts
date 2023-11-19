import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { RelativesModule } from './relatives/relatives.module';
import { Relative } from './relatives/relatives.model';
import { FamilyMembersModule } from './family_members/family_members.module';
import { FamilyMember } from './family_members/FamilyMembers.model';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { VideoModule } from './video/video.module';
import { Video } from './video/video.model';


@Module({
  imports: [
    ConfigModule.forRoot({                                               // модуль конфигурации
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({                                           // модуль SequelizeModule
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,                                // системные переменные
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Relative, FamilyMember, User, Video],                             // импортируем создаваемые модели
      autoLoadModels: true,                                               // таблица создаётся в базе автоматически на основании  моделей models
    }),
    RelativesModule,
    FamilyMembersModule,
    AuthModule,
    UsersModule,
    VideoModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
