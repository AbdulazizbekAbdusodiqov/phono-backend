import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createColorDto: CreateColorDto) {
    return this.prismaService.color.create({data:createColorDto})
  }

  findAll() {
    return this.prismaService.color.findMany()
  }

  findOne(id: number) {
    return this.prismaService.color.findUnique({where:{id}})
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return this.prismaService.color.update({where:{id}, data:updateColorDto})
  }

  remove(id: number) {
    return this.prismaService.color.delete({where:{id}})
  }
}
