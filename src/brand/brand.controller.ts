import {
  Controller, Get, Post, Body, Param, Delete, Put,
  UseGuards
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  @ApiBearerAuth('phono')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create new brand' })
  @ApiResponse({ status: 201, description: 'Brand created successfully' })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, description: 'List of all brands' })
  findAll() {
    return this.brandService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Get brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand found' })
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }
  
  @Put(':id')
  @ApiBearerAuth('phono')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand updated successfully' })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }
  
  @Delete(':id')
  @ApiBearerAuth('phono')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand deleted successfully' })
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
