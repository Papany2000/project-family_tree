import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';



@ApiTags("Пользователи")
@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    async createRelatives(@Body() dto: CreateUserDto) {
      try {
        return await this.usersService.create(dto)
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        }, HttpStatus.FORBIDDEN, {
          cause: error
        });
      }
  
    }
  
    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200, type: User })
    @Get()
    getAll() {
      return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Получение пользователей по email' })
    @ApiResponse({ status: 200, type: User })
    @Get()
    getUser(@Body() dto: CreateUserDto) {
      return this.usersService.getUserByEmail(dto.email);
    }
}
