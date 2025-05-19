import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsInt()
  @IsNotEmpty()
  receiverId: number;

  @IsInt()
  @IsNotEmpty()
  senderId: number;
}