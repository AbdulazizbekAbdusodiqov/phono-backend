import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isChecked } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      where: { is_deleted: false },
      include: {
        user: true,
        brand: true,
        model: true,
        color: true,
        currency: true,
        address: true,
        product_image: true,
      },
    });
  }

  getProductByUserId(userId: number) {
    return this.prisma.product.findMany({
      where: { user_id: userId, is_checked: isChecked.APPROVED, is_deleted: false },
      include: {
        user: true,
        brand: true,
        model: true,
        color: true,
        currency: true,
        address: true,
        product_image: true,
      },
    });
  }

  getPendingProducts() {
    return this.prisma.product.findMany({
      where: { is_checked: isChecked.PENDING, is_deleted: false },
      include: {
        user: true,
        brand: true,
        model: true,
        color: true,
        currency: true,
        address: true,
        product_image: true,
      },
    });
  }

  approvProduct(id: number) {
    return this.prisma.product.update({
      where: { id, is_deleted: false },
      data: { is_checked: isChecked.APPROVED },
    });
  }

  rejectProduct(id: number) {
    return this.prisma.product.update({
      where: { id, is_deleted: false },
      data: { is_checked: isChecked.REJECTED },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id, is_deleted: false },
      include: {
        user: true,
        brand: true,
        model: true,
        color: true,
        currency: true,
        address: true,
        product_image: true
      }
    });
  }

  getProductByTitleQuery(query: string) {
    return this.prisma.product.findMany({
      where: { title: { contains: query, mode: 'insensitive' }, is_deleted: false },
      include: {
        user: true,
        brand: true,
        model: true,
        color: true,
        currency: true,
        address: true,
        product_image: true,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id, is_deleted: false },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.product.update({ where: { id, is_deleted: false }, data: { is_deleted: true } });
  }
}
