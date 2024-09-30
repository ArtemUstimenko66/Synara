import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    messageData: {
      chatId: number;
      content: string;
      type: 'text' | 'image';
    },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Received message data:', messageData);
    const token = client.handshake.headers.cookie
      ?.split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    let userId: number;
    try {
      const payload = this.jwtService.verify(token);
      userId = payload.id;
    } catch (e) {
      throw new Error('Invalid token');
    }

    const message = await this.messageService.create(
      messageData.content,
      messageData.chatId,
      userId,
      messageData.type,
    );
    console.log('Message created:', message);

    this.server.to(`chat_${messageData.chatId}`).emit('newMessage', message);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const room = `chat_${chatId}`;
    console.log(`Client joined room: ${room}`);

    client.join(room);
    return { event: 'joinedChat', data: { room } };
  }


  @SubscribeMessage('markAsRead')
  async handleMarkMessageAsRead(
      @MessageBody() data: { messageId: number },
      @ConnectedSocket() client: Socket
  ) {
    const token = client.handshake.headers.cookie
        ?.split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    let userId: number;
    try {
      const payload = this.jwtService.verify(token);
      userId = payload.id;
    } catch (e) {
      throw new Error('Invalid token');
    }

    const updatedMessage = await this.messageService.markMessageAsRead(data.messageId);

    this.server.to(`chat_${updatedMessage.chat.id}`).emit('messageRead', updatedMessage);
  }

}
