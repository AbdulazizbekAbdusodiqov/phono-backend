import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat({ senderId, receiverId }: CreateChatDto, userId: number) {
    if (senderId === receiverId) {
      throw new BadRequestException('Cannot create a chat with yourself');
    }

    const existingChat = await this.prisma.chat.findFirst({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });

    if (existingChat) {
      return existingChat;
    }

    return this.prisma.chat.create({
      data: {
        senderId,
        receiverId,
      },
    });
  }

  async findChat(senderId: number, receiverId: number) {
    return this.prisma.chat.findFirst({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      include: { messages: true, sender: true, receiver: true },
    });
  }

  async createMessage(createMessageDto: CreateMessageDto, senderId: number, fileUrl?: string) {
    const chat = await this.findChat(senderId, createMessageDto.receiverId);
    if (!chat) {
      throw new Error('Chat not found');
    }

    return this.prisma.message.create({
      data: {
        type: fileUrl ? createMessageDto.type : 'TEXT',
        content: fileUrl || createMessageDto.content,
        senderId,
        chatId: chat.id,
      },
      include: { sender: true, chat: true },
    });
  }

  async getUserChats(userId: number) {
    return this.prisma.chat.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: { sender: true, receiver: true, messages: true },
    });
  }
}