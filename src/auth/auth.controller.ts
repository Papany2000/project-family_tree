import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';






@Controller('auth')

export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Авторизация' })
    @ApiResponse({ status: 200, type: AuthService })
    @Post('/login')
    login(@Body() userDTO: CreateUserDto) {
        return this.authService.login(userDTO)
    }

    @ApiOperation({ summary: 'Регистрация' })
    @ApiResponse({ status: 200, type: AuthService })
    @Post('/registration')
    registration(@Body() userDTO: CreateUserDto) {
        return this.authService.registration(userDTO)
    }
}
