import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEmailDto: CreateEmailDto) {
    return await this.prismaService.email.create({ data: createEmailDto });
  }

  async createByUser(createEmailDto: CreateEmailDto) {
    const oldEmail = await this.prismaService.email.findFirst({where: {email: createEmailDto.email}})
    if(oldEmail && oldEmail.user_id == createEmailDto.user_id){
      throw new BadRequestException(`This email: ${createEmailDto.email} already has been created for you`); 
    } else if(oldEmail){
      throw new BadRequestException(`This email: ${createEmailDto.email} already has been created for other`)
    }

    return await this.prismaService.email.create({ data: createEmailDto });
  }

  async findAll() {
    return await this.prismaService.email.findMany();
  }

  async findOne(id: number) {
    const email = await this.prismaService.email.findUnique({ where: { id } });
    if (!email) {
      throw new NotFoundException(`Email with ID ${id} not found`);
    }
    return email;
  }

  async findEmailsByUser(id: number) {
    const email = await this.prismaService.email.findMany({
      where: { user_id: id },
    });
    if (!email) {
      throw new NotFoundException(`Email with ID ${id} not found`);
    }
    return email;
  }

  async update(id: number, updateEmailDto: UpdateEmailDto) {
    // Avval mavjudligini tekshirish
    await this.findOne(id);

    return await this.prismaService.email.update({
      where: { id },
      data: updateEmailDto,
    });
  }

  async remove(id: number, emailId: number) {
    const email = await this.prismaService.email.findFirst({
      where: { id: emailId, user_id: id },
    });

    console.log('email: ->', email);

    if (!email) {
      throw new ForbiddenException("You can't delete this email");
    }

    const result = await this.prismaService.email.delete({
      where: { id: emailId }, // faqat id kerak, chunki id unique bo'lishi kerak
    });
    console.log('result: email: ', result);
    return result;
  }
}
