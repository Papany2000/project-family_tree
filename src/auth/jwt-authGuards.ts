import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization; // правильное написание 'headers'
            const [bearer, token] = authHeader.split(' '); // правильное использование split(' ')

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: "Пользователь не авторизован" });
            }

            const user = this.jwtService.verify(token);
            req.user = user;

            return true;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException({ message: error });
        }
    }
}