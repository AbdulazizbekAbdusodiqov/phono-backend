import { Injectable } from '@nestjs/common';
import { CreatePhoneNumberDto } from './dto/create-phone_number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone_number.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhoneNumberService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createPhoneNumberDto: CreatePhoneNumberDto) {
    return this.prismaService.phoneNumber.create({
      data: createPhoneNumberDto,
    });
  }

  findAll() {
    return this.prismaService.phoneNumber.findMany();
  }

  findOne(id: number) {
    return this.prismaService.phoneNumber.findUnique({ where: { id } });
  }

  update(id: number, updateDistrictDto: UpdatePhoneNumberDto) {
    return this.prismaService.phoneNumber.update({
      where: { id },
      data: updateDistrictDto,
    });
  }

  remove(id: number) {
    return this.prismaService.phoneNumber.delete({ where: { id } });
  }
}
