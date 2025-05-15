import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModelService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createModelDto: CreateModelDto) {
    return this.prismaService.model.create({data:createModelDto})
  }

  findAll() {
    return this.prismaService.model.findMany()
  }

  findOne(id: number) {
    return this.prismaService.model.findUnique({where:{id}})
  }

  update(id: number, updateModelDto: UpdateModelDto) {
    return this.prismaService.model.update({where:{id}, data: updateModelDto})
  }

  remove(id: number) {
    return this.prismaService.brand.delete({where:{id}})
  }
}
