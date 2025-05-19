import { Controller, Post, Body, Get, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { WsJwtGuard } from '../guards/ws-jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(WsJwtGuard)
  @Post()
  async createChat(@Body() createChatDto: CreateChatDto, @Req() req) {
    return this.chatService.createChat(createChatDto, req.user.userId);
  }

  @UseGuards(WsJwtGuard)
  @Get()
  async getUserChats(@Req() req) {
    return this.chatService.getUserChats(req.user.userId);
  }

  @UseGuards(WsJwtGuard)
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