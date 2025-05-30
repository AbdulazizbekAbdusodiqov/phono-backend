import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  storage: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  ram: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  user_id?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  brand_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  model_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  other_model?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  color_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
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

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  address_id?: number;

  @ApiProperty({
    type: "array",
    items: {
      type: "string",
      format: "binary",
    },
  })
  @IsOptional()
  images?: Express.Multer.File[];
}
