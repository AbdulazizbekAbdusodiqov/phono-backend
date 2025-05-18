import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreatePaymentMethodDto {
  @ApiProperty({
    description: 'Payment method name',
    example: 'Card  ',
  })
  @IsString({ message: 'Name must be a string' })
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name: string;
}
