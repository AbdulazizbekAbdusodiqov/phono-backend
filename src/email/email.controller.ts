import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Emails')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new email' })
  @ApiResponse({ status: 201, description: 'Email successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all emails' })
  @ApiResponse({ status: 200, description: 'List of emails' })
  findAll() {
    return this.emailService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an email by ID' })
  @ApiResponse({ status: 200, description: 'Email found' })
  @ApiResponse({ status: 404, description: 'Email not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.emailService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an email by ID' })
  @ApiResponse({ status: 200, description: 'Email updated' })
  @ApiResponse({ status: 404, description: 'Email not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.emailService.update(id, updateEmailDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an email by ID' })
  @ApiResponse({ status: 200, description: 'Email deleted' })
  @ApiResponse({ status: 404, description: 'Email not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.emailService.remove(id);
  }
}
