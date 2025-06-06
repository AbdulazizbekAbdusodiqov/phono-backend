import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { isChecked } from "@prisma/client";
import { Express } from "express";
import slugify from "slugify";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto, files: any) {
    try {
      if (createProductDto.user_id) {
        const userExists = await this.prisma.user.findUnique({
          where: { id: createProductDto.user_id },
        });

        if (!userExists) {
          throw new NotFoundException(`User with ID ${createProductDto.user_id} does not exist`);
        }
      }

      if (createProductDto.model_id == 0) {
        delete createProductDto.model_id
      }
      const newProduct = await this.prisma.product.create({
        data: createProductDto,
      });
      console.log("hellomaleykum2");
      const slug = slugify(`${newProduct.title} ${newProduct.id}`, {
        lower: true,
        replacement: "-",
      });
      const updatedProduct = await this.prisma.product.update({
        where: { id: newProduct.id },
        data: { slug },
        include: {
          product_image: true,
          user: true,
          brand: true,
          model: true,
          color: true,
          currency: true,
          address: true,
        },
      });

      const imagePaths =
        files?.images?.map((img: Express.Multer.File) => ({
          image: img.path.split("public/")[1],
        })) || [];
      console.log(imagePaths);

      if (!imagePaths.length) {
        throw new BadRequestException("No images uploaded");
      }

      const newProductImages = await this.prisma.productImage.createMany({
        data: imagePaths.map((path: any) => ({
          product_id: updatedProduct.id,
          url: path.image,
        })),
      });

      return { product: updatedProduct, productImages: newProductImages };
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search: string,
    color: string,
    memory: string,
    othermodel: string,
    brand: string,
    region: string,
    condition: boolean
  ) {
    const skip = (page - 1) * limit;

    const where: any = {
      is_deleted: false,
      ...(search && { title: { contains: search, mode: "insensitive" } }),
      ...(color && { color: { name: color } }),
      ...(othermodel && { other_model: othermodel }),
      ...(memory && !isNaN(Number(memory)) && { ram: Number(memory) }),
      ...(brand && { brand: { name: brand } }),
      ...(region && { address: { region: { name: region } } }),
      ...(typeof condition === "boolean" && { condition }),
    };

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip,
        take: limit,
        where,
        include: {
          user: true,
          brand: true,
          model: true,
          color: true,
          currency: true,
          address: true,
          product_image: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async getProductBySlug(slug: string) {
    return await this.prisma.product.findUnique({
      where: { slug, is_deleted: false },
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

  async getProductByUserId(userId: number) {
    return await this.prisma.product.findMany({
      where: {
        user_id: userId,
        is_checked: isChecked.APPROVED,
        is_deleted: false,
      },
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

  async getPendingProducts() {
    return await this.prisma.product.findMany({
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

  async approvProduct(id: number) {
    return await this.prisma.product.update({
      where: { id, is_deleted: false },
      data: { is_checked: isChecked.APPROVED },
    });
  }

  async rejectProduct(id: number) {
    return await this.prisma.product.update({
      where: { id, is_deleted: false },
      data: { is_checked: isChecked.REJECTED },
    });
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({
      where: { id, is_deleted: false },
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

  async getAllProduct() {
    return await this.prisma.product.findMany({
      where: {
        is_active: true,
        is_deleted: false
      },
      include: {
        product_image: true,
        brand: true,
        color: true,
        currency: true,
        model: true
      }
    })
  }

  async getProductByTitleQuery(query: string) {
    console.log(query);
    return await this.prisma.product.findMany({
      where: {
        title: { contains: query, mode: "insensitive" },
        is_deleted: false,
      },
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

  async createProductImage(id: number, image: Express.Multer.File) {
    return await this.prisma.productImage.create({
      data: {
        product_id: id,
        url: image.path.split("public/")[1],
      },
    });
  }

  async deleteProductImage(id: number) {
    return await this.prisma.productImage.delete({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id, is_deleted: false },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.prisma.product.update({
      where: { id, is_deleted: false },
      data: { is_deleted: true },
    });
    return { message: "Product deleted successfully" };
  }
}
