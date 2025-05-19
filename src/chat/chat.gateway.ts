import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UseGuards } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { WsJwtGuard } from '../guards/ws-jwt.guard';

@UseGuards(WsJwtGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(client: Socket, data: { senderId: number; receiverId: number }) {
    const chat = await this.chatService.findChat(data.senderId, data.receiverId);
    if (chat) {
      client.join(`chat_${chat.id}`);
      client.emit('chatJoined', chat);
    }
    else {
      await this.chatService.createChat({ receiverId: data.receiverId, senderId: data.senderId }, data.senderId);
      const chat = await this.chatService.findChat(data.senderId, data.receiverId);
      client.join(`chat_${chat?.id}`);
      client.emit('chatJoined', chat);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, data: CreateMessageDto & { senderId: number }) {
    const message = await this.chatService.createMessage(data, data.senderId);
    this.server.to(`chat_${message.chatId}`).emit('newMessage', message);
  }
}