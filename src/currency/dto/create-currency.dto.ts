import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @ApiProperty({
    description: 'Valyuta nomi (masalan: USD, UZS, EUR)',
    example: 'USD',
  })
  @IsString({ message: 'Name must be a string' })
  @Length(2, 10, { message: 'Name must be between 2 and 10 characters' })
  name: string;
}
