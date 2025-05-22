import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new currency' })
  @ApiResponse({ status: 201, description: 'Currency created successfully' })
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all currencies' })
  @ApiResponse({ status: 200, description: 'List of currencies' })
  findAll() {
    return this.currencyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get currency by ID' })
  @ApiResponse({ status: 200, description: 'Currency data found' })
  @ApiResponse({ status: 404, description: 'Currency not found' })
  findOne(@Param('id') id: string) {
    return this.currencyService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update currency by ID' })
  @ApiResponse({ status: 200, description: 'Currency updated successfully' })
  update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyService.update(+id, updateCurrencyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete currency by ID' })
  @ApiResponse({ status: 200, description: 'Currency deleted successfully' })
  remove(@Param('id') id: string) {
    return this.currencyService.remove(+id);
  }
}
