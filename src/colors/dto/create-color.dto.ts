import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({
    description: 'Rang nomi',
    example: 'Red',
  })
  @IsString({ message: 'Name must be a string' })
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  name: string;
}
