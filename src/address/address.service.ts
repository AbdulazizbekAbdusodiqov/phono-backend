import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
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

  async findAddressByRegionIdAndDistrictId(region_id: number, district_id: number) {
    const address = await this.prisma.address.findFirst({
      where: {   region_id, district_id  },
    });
    return {
      message: "Succefully found",
      data: address,
      status_code: 200,
    };
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

  async remove(id: number, addressId: number) {
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, user_id: id },
    });

    console.log("address: ->", address);

    if (!address) {
      throw new ForbiddenException("You can't delete this address");
    }

    const result = await this.prisma.address.delete({
      where: { id }, // faqat id kerak, chunki id unique bo'lishi kerak
    });
    console.log("result: address: ", result);
    return result
  }
}
