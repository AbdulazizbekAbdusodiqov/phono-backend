import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { BcryptEncryption } from "../utils/bcryptService";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashed_password = await BcryptEncryption.encrypt(
      createUserDto.password
    );

    const newUser = await this.prisma.user.create({
      data: {
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        password: hashed_password,
        phone_number: {
          create: {
            phone_number: createUserDto.phone_number,
            is_main: true,
          },
        },
      },
      include: {
        phone_number: true,
      },
    });

    return newUser;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        brith_date: true,
        profile_img: true,
        is_active: true,
        is_premium: true,
        last_online: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
        product: {
          include: {
            product_image: true,
            brand: true,
            model: true,
          },
        },
      },
    });
  }

  async findUserByPhoneNumber(phone_number: string) {
    return this.prisma.phoneNumber.findFirst({
      where: { phone_number, is_main: true },
      include: { user: true },
    });
  }

  async updateUserRefreshToken(id: number, token: string | undefined) {
    return await this.prisma.user.update({
      where: { id },
      data: { hashed_refresh_token: token },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { phone_number: true },
    });
  }

  async findOneById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async blockUserById(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { is_active: false },
    });
  }
}
