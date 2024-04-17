import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MyLogger } from '@/logger/logger.service';
import { WsExceptionFilter } from '@/utils/filters/ws-exception.filter';
import { WebcomponentDTO } from '@/websockets/dtos/webcomponent.dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@UseFilters(WsExceptionFilter)
@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private logger: MyLogger) {
    this.logger.setContext(WebSocketGateway.name);
  }

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('generate-webcomponent')
  handleWebcomponent(client: Socket, payload: WebcomponentDTO) {
    this.logger.log(
      `Generate Webcomponent request received from: ${client.id}`,
    );
    this.server.emit('generate-webcomponent', payload);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
