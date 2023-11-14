import { Controller, Post, Body, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FamilyMember } from './FamilyMembers.model';
import { CreateFamilyMemberDto } from './dto/create-family_members.dto';
import { ValidationPipe } from '@nestjs/common/pipes'
import { UseGuards, UsePipes } from '@nestjs/common/decorators'
import { FamilyMembersService } from './family_members.service';
import { JwtAuthGuard } from 'src/auth/jwt-authGuards';

@UseGuards(JwtAuthGuard)
@Controller('family-members')
export class FamilyMembersController {
  constructor(private familyMember: FamilyMembersService) { }

  @ApiOperation({ summary: 'Создание родственника' })
  @ApiResponse({ status: 200, type: FamilyMember })
  @Post()
  @UsePipes(new ValidationPipe())
  async createFamilyMembers(@Body() dto: CreateFamilyMemberDto) {
    try {
      return await this.familyMember.create(dto)
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
  @ApiResponse({ status: 200, type: FamilyMember })
  @Get()
  async getAllFamilyMembers() {
    try{ return this.familyMember.getAllFamilyMembers()
    } catch (error) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        }, HttpStatus.FORBIDDEN, {
          cause: error
        });
    }
  } 
  @ApiOperation({ summary: 'Получение  родственников по идентификатору' })
  @ApiResponse({ status: 200, type: FamilyMember })
  @Get('/:value')
  async  getAllKinshipFamilyMembers (@Param('value') value: string ) {
    try{
      return this.familyMember.getFamilyMembersKinship(value)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

}
