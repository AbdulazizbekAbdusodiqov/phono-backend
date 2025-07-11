import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBrandDto: CreateBrandDto, image?: Express.Multer.File) {
    const existingBrand = await this.prismaService.brand.findUnique({
      where: { name: createBrandDto.name },
    });

    if (existingBrand) {
      throw new BadRequestException(
        `${createBrandDto.name} nomli brend allaqachon mavjud!`,
      );
    }

    const data: any = {
      ...createBrandDto,
    };
    if (image) {
      data.logo = image.filename;
    }

    return this.prismaService.brand.create({
      data,
    });
  }

  async findAll() {
    return this.prismaService.brand.findMany({
      include: {
        model: true,
        product: true,
      },
    });
  }

  async findOne(id: number) {
    const brand = await this.prismaService.brand.findUnique({
      where: { id },
      include: { model: true, product: true },
    });

    if (!brand) {
      throw new NotFoundException(`Brend topilmadi (id: ${id})`);
    }

    return brand;
  }

  async update(
    id: number,
    updateBrandDto: UpdateBrandDto,
    image?: Express.Multer.File,
  ) {
    const brand = await this.prismaService.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Brend topilmadi (id: ${id})`);
    }

    if (
      updateBrandDto.name &&
      updateBrandDto.name !== brand.name
    ) {
      const existingBrand = await this.prismaService.brand.findUnique({
        where: { name: updateBrandDto.name },
      });

      if (existingBrand) {
        throw new BadRequestException(
          `"${updateBrandDto.name}" nomli brend allaqachon mavjud!`,
        );
      }
    }

    const data: any = {
      ...updateBrandDto,
    };

    if (image) {
      data.logo = image.filename;
    }

    return this.prismaService.brand.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const brand = await this.prismaService.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Brend topilmadi (id: ${id})`);
    }

    return this.prismaService.brand.delete({
      where: { id },
    });
  }
}
