import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { MyLogger } from '@/logger/logger.service';

interface WebSocketClientData {
  uuid: string;
}

@Catch(WsException, HttpException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  constructor(private logger: MyLogger) {
    super();
    this.logger.setContext(WsExceptionFilter.name);
  }

  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const data = host.switchToWs().getData<WebSocketClientData>();
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse();
    const details =
      error instanceof Object ? Object.assign({}, error) : { message: error };
    const message = Object.assign({ uuid: data.uuid }, details);
    this.logger.error(message);
    client.emit('error', message);
  }
}
