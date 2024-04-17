import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';

export class SocketAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }
  createIOServer(port: number, options: ServerOptions): Server {
    port = this.configService.get<number>('WEBSOCKET_PORT');
    let origin: string | boolean = this.configService.get<string>(
      'WEBSOCKET_CORS_ORIGIN',
    );
    origin = origin === 'true' ? true : origin;
    options.cors = { origin, methods: ['GET', 'POST'], credentials: true };
    return super.createIOServer(port, options) as Server;
  }
}
