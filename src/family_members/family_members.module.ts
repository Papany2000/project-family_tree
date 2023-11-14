import { Module, forwardRef } from '@nestjs/common';
import { FamilyMembersController } from './family_members.controller';
import { FamilyMembersService } from './family_members.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FamilyMember } from './FamilyMembers.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FamilyMembersService],
  controllers: [FamilyMembersController],
  imports: [SequelizeModule.forFeature([FamilyMember]),
  forwardRef(() => AuthModule)
],
  
 
})
export class FamilyMembersModule {}
