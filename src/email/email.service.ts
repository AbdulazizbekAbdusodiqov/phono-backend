import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(email: string, user_id: number) {
    return await this.prismaService.email.create({ data: {email, user_id}} );
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
    const email = await this.prismaService.email.findMany({ where: { id } });
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

  async remove(id: number) {
    // Avval mavjudligini tekshirish
    await this.findOne(id);

    return await this.prismaService.email.delete({ where: { id } });
  }
}
