import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWriteStream } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message } from './chatroom.types';

@Injectable()
export class ChatroomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) { }

  async getChatroom(id: string) {
    return this.prisma.chatroom.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async createChatroom(name: string, userIds: number[]) {
    const existingChatroom = await this.prisma.chatroom.findFirst({
      where: {
        AND: [
          {
            users: {
              every: {
                id: {
                  in: userIds,
                },
              },
            },
          },
          {
            users: {
              some: {
                id: userIds[0],
              },
            },
          },
          {
            users: {
              some: {
                id: userIds[1],
              },
            },
          },
          {
            users: {
              none: {
                id: {
                  notIn: userIds,
                },
              },
            },
          },
        ],
      },
    });

    if (existingChatroom) {
      return existingChatroom
    }

    return await this.prisma.chatroom.create({
      data: {
        name,
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
    });
  }


  async addUsersToChatroom(chatroomId: number, userIds: number[]) {
    const existingChatroom = await this.prisma.chatroom.findUnique({
      where: {
        id: chatroomId,
      },
    });
    if (!existingChatroom) {
      throw new BadRequestException({ chatroomId: 'Chatroom does not exist' });
    }

    return await this.prisma.chatroom.update({
      where: {
        id: chatroomId,
      },
      data: {
        users: {
          connect: userIds.map((id) => ({ id: id })),
        },
      },
      include: {
        users: true, // Eager loading users
      },
    });
  }
  async getChatroomsForUser(userId: number) {
    return this.prisma.chatroom.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: {
          orderBy: {
            createdAt: 'desc',
          },
        }, // Eager loading users

        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
  async sendMessage(
    chatroomId: number,
    message: string,
    userId: number,
    imagePath: string,
  ) {
    return await this.prisma.message.create({
      data: {
        content: message,
        imageUrl: imagePath,
        chatroomId,
        userId,
      },
      include: {
        chatroom: {
          include: {
            users: true,
          },
        },
        user: true,
      },
    });
  }

  async deleteMessage(messageId: number): Promise<Number> {
  const msg = await this.prisma.message.findUnique({ where: { id: messageId } });
  if (!msg) throw new NotFoundException('Message not found');
  await this.prisma.message.delete({ where: { id: messageId } });
  return msg.id;
}

  async saveImage(image: {
    createReadStream: () => any;
    filename: string;
    mimetype: string;
  }) {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(image.mimetype)) {
      throw new BadRequestException({ image: 'Invalid image type' });
    }

    const imageName = `${Date.now()}-${image.filename}`;
    const imagePath = `${this.configService.get('IMAGE_PATH')}/${imageName}`;
    const stream = image.createReadStream();
    const outputPath = `public${imagePath}`;
    const writeStream = createWriteStream(outputPath);
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    return imagePath;
  }
  async getMessagesForChatroom(chatroomId: number) {
    return await this.prisma.message.findMany({
      where: {
        chatroomId: chatroomId,
      },
      include: {
        chatroom: {
          include: {
            users: {
              orderBy: {
                createdAt: 'asc',
              },
            }, // Eager loading users
          },
        }, // Eager loading Chatroom
        user: true, // Eager loading User
      },
    });
  }

  async deleteChatroom(chatroomId: number) {
    return this.prisma.chatroom.delete({
      where: {
        id: chatroomId,
      },
    });
  }
}
