import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new region' })
  @ApiResponse({ status: 201, description: 'Region created successfully' })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all regions' })
  @ApiResponse({ status: 200, description: 'List of regions' })
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a region by ID' })
  @ApiResponse({ status: 200, description: 'Region retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a region by ID' })
  @ApiResponse({ status: 200, description: 'Region updated successfully' })
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a region by ID' })
  @ApiResponse({ status: 200, description: 'Region deleted successfully' })
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
