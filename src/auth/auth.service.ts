import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService) { }

    async login(userDTO: CreateUserDto) {
        const user = await this.validateUser(userDTO)
        return this.generateToken(user)
    }

    async registration(userDTO: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDTO.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким именем существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDTO.password, 5)
        const user = await this.usersService.create({ ...userDTO, password: hashPassword });
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const pyload = { email: user.email, id: user.id };
        return {
            token: this.jwtService.sign(pyload)
        }
    }

    private async validateUser(userDTO: CreateUserDto) {
        // получаем user из базы данных по email
        const user = await this.usersService.getUserByEmail(userDTO.email);
        // сравниваем password из userDTO (тот что передали с фронта) с  user.password из базы
        const passwordEquals = await bcrypt.compare(userDTO.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: "Некорректный password или email" })
    }
}

