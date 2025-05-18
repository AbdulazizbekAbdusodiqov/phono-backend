import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prismaService: PrismaService) {}
    create(createEmailDto: CreateEmailDto) {
        return this.prismaService.email.create({data:createEmailDto})
    }
  
    findAll() {
      return this.prismaService.email.findMany()
    }
  
    findOne(id: number) {
      return this.prismaService.email.findUnique({where:{id}})
    }
  
    update(id: number, updateDistrictDto: UpdateEmailDto) {
      return this.prismaService.email.update({where:{id}, data:updateDistrictDto})
    }
  
    remove(id: number) {
      return this.prismaService.email.delete({where:{id}})
    }
}
