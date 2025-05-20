import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFiles, BadRequestException, InternalServerErrorException, Put, UploadedFile } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ProductService } from './product.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({ summary: "Yangi product qo'shish" })
  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "images", maxCount: 10 }], multerOptions)
  )
  async create(
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
    },
    @Body() createProductDto: CreateProductDto
  ) {
    try {
      return await this.productService.create(createProductDto, files);
    } catch (error) {
      // Handle Prisma foreign key constraint errors
      if (error.code === 'P2003') {
        throw new BadRequestException(`Foreign key constraint failed: ${error.meta?.field || 'Unknown field'}`);
      }
      throw new InternalServerErrorException(error.message || 'An unexpected error occurred');
    }
  }

  @ApiOperation({ summary: "productlarni ko'rish" })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: "productni ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({ summary: "userning productlarini ko'rish" })
  @Get('user/:id')
  getProductByUserId(@Param('id') id: number) {
    return this.productService.getProductByUserId(+id);
  }

  @ApiOperation({ summary: "productlarni title bo'yicha qidirish (query param bilan)" })
  @Get('search')
  getProductByTitleQuery(@Query('search') search: string) {
    return this.productService.getProductByTitleQuery(search);
  }

  @ApiOperation({ summary: "pending productlarni ko'rish" })
  @UseGuards(AdminGuard)
  @Get('pending')
  getPendingProducts() {
    return this.productService.getPendingProducts();
  }

  @ApiOperation({ summary: "productni approved qilish" })
  @UseGuards(AdminGuard)
  @Get('approved/:id')
  approveProduct(@Param('id') id: number) {
    return this.productService.approvProduct(+id);
  }

  @ApiOperation({ summary: "productni rejected qilish" })
  @UseGuards(AdminGuard)
  @Get('rejected/:id')
  rejectProduct(@Param('id') id: number) {
    return this.productService.rejectProduct(+id);
  }

  @ApiOperation({ summary: "productni yangilash" })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }
  
  @ApiOperation({ summary: "productni image qo'shish" })
  @Post('image/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', multerOptions)
  )
  cresteProductImage(
    @Param('id') id: number,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.productService.createProductImage(+id, image)
  }

  @ApiOperation({ summary: "productni image o'chirish" })
  @Delete('image/:id')
  deleteProductImage(@Param('id') id: number) {
    return this.productService.deleteProductImage(+id);
  }

  @ApiOperation({ summary: "productni o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(+id);
  }
}
