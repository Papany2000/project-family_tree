import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor (@InjectModel(User) private userRepository: typeof User) {}

    async create(dto: CreateUserDto) {
        const relative  = await this.userRepository.create(dto);
        return relative;
      }

      async getAllUsers() {
        const relatives = await this.userRepository.findAll();
        return relatives;
      }

      async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {email},
        })
        return user
      }
}
