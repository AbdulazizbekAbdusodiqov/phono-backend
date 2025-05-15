import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  storage: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ram: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  brand_id: number;
  
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  model_id?: number;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  other_model?: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  color_id: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  currency_id: number;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  year: string;
  
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  negotiable: boolean;
  
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  condition: boolean;
  
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  has_document: boolean;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone_number: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  address_id: number;
}
