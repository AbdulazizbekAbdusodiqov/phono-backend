import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhoneNumberDto } from './dto/create-phone_number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone_number.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhoneNumberService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPhoneNumberDto: CreatePhoneNumberDto) {
    return await this.prismaService.phoneNumber.create({
      data: createPhoneNumberDto,
    });
  }

  async findAll() {
    return await this.prismaService.phoneNumber.findMany();
  }

  async findOne(id: number) {
    const phoneNumber = await this.prismaService.phoneNumber.findUnique({
      where: { id },
    });
    if (!phoneNumber) {
      throw new NotFoundException(`Phone number with ID ${id} not found`);
    }
    return phoneNumber;
  }

  async findPhonesByUser(id: number) {
    const phoneNumber = await this.prismaService.phoneNumber.findMany({
      where: { id },
    });
    if (!phoneNumber) {
      throw new NotFoundException(`Phone number with ID ${id} not found`);
    }
    return phoneNumber;
  }

  async update(id: number, updatePhoneNumberDto: UpdatePhoneNumberDto) {
    // Avval mavjudligini tekshirish
    await this.findOne(id);

    return await this.prismaService.phoneNumber.update({
      where: { id },
      data: updatePhoneNumberDto,
    });
  }

  async remove(id: number) {
    // Avval mavjudligini tekshirish
    await this.findOne(id);

    return await this.prismaService.phoneNumber.delete({ where: { id } });
  }
}
