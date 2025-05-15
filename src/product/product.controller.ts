import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ProductService } from './product.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({ summary: "Yangi product qo'shish" })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: "productlarni ko'rish" })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: "productni ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({ summary: "userning productlarini ko'rish" })
  @Get('user/:id')
  getProductByUserId(@Param('id') id: string) {
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
  approveProduct(@Param('id') id: string) {
    return this.productService.approvProduct(+id);
  }

  @ApiOperation({ summary: "productni rejected qilish" })
  @UseGuards(AdminGuard)
  @Get('rejected/:id')
  rejectProduct(@Param('id') id: string) {
    return this.productService.rejectProduct(+id);
  }

  @ApiOperation({ summary: "productni yangilash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiOperation({ summary: "productni o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
