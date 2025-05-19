import { Controller, Post, Body, Get, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createChat(@Body() createChatDto: CreateChatDto, @Req() req) {
    return this.chatService.createChat(createChatDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserChats(@Req() req) {
    return this.chatService.getUserChats(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('message')
  @UseInterceptors(FileInterceptor('file'))
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.chatService.createMessage(createMessageDto, req.user.userId, fileUrl);
  }
}