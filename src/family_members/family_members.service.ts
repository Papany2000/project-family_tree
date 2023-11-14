import { Injectable } from '@nestjs/common';
import { FamilyMember } from './FamilyMembers.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFamilyMemberDto } from './dto/create-family_members.dto';
import { Relative } from 'src/relatives/relatives.model';

@Injectable()
export class FamilyMembersService {
    constructor(@InjectModel(FamilyMember) private familyMemberRepository: typeof FamilyMember) { }

    async create(dto: CreateFamilyMemberDto) {
        const familyMember = await this.familyMemberRepository.create(dto);
        return familyMember;
    }

    async getAllFamilyMembers() {
        const tree = await this.familyMemberRepository.findAll({
            raw: true
        });
        function buildTree(nodes) {
            const nodeMap = new Map();
            nodes.forEach((el) => {
                nodeMap.set(el.id, { ...el, children: [] });
            });
            const roots = nodes.filter(el => !el.parentId).map(el => nodeMap.get(el.id))
            nodes.forEach(({ id, parentId }) => {
                const currentNode = nodeMap.get(id);
                const parentNode = nodeMap.get(parentId);
                if (parentNode) {
                    parentNode.children.push(currentNode);
                }
            });
            return roots;
        }
        const familyMembers = buildTree(tree)
        return familyMembers
        
    }

    async getFamilyMembersKinship(kinshipId: string) {
        const familemembers = await this.familyMemberRepository.findAll({
            where: { kinshipId },
        })
        const kinship = await Relative.findByPk(kinshipId)
        return { kinship: kinship.kinship, familemembers }
    }

}



