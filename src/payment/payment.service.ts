import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.prismaService.payment.create({ data: createPaymentDto });
  }

  findAll() {
    return this.prismaService.payment.findMany();
  }

  async findOne(id: number) {
    const payment = await this.prismaService.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prismaService.payment.update({
      where: { id },
      data: { ...updatePaymentDto, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.prismaService.payment.delete({ where: { id } });
  }
}
