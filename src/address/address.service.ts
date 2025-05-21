import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto) {
    const data = await this.prisma.address.create({ data: createAddressDto });
    return {
      message: "Succefully created",
      data,
      status_code: 200,
    };
  }

  findAll(user_id: number) {
    return this.prisma.address.findMany({
      where: { user_id },
      include: { user: true, region: true, district: true },
    });
  }

  async findOne(id: number) {
    const address = await this.prisma.address.findUnique({
      where: { id },
      include: { user: true, region: true, district: true },
    });

    if (!address) {
      throw new NotFoundException(`Address not found with this id ${id}`);
    }
    return { message: "", data: address, status_code: 200 };
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    await this.findOne(id);
    await this.prisma.address.update({ where: { id }, data: updateAddressDto });

    return { message: "Succefullt updated", data: {}, status_code: 200 };
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.address.delete({ where: { id } });

    return {
      message: "Succesfully deleted",
      status_code: 200,
      data: {},
    };
  }
}
