import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@/app.module';
import { MyLogger } from '@/logger/logger.service';
import { HttpExceptionFilter } from '@/utils/filters/http-exception.filter';
import { SocketAdapter } from '@/websockets/socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const wsPort = configService.get<number>('WEBSOCKET_PORT');

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useLogger(new MyLogger());
  app.useGlobalFilters(
    new HttpExceptionFilter(
      await app.resolve(MyLogger),
      app.get(HttpAdapterHost),
    ),
  );
  app.useWebSocketAdapter(new SocketAdapter(app, configService));

  const config = new DocumentBuilder()
    .setTitle('Calipso Analytics Back')
    .setDescription('The Analytics Calipso API')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  global.XMLHttpRequest = require('xhr2');

  await app.listen(port, '0.0.0.0');

  const logger = new Logger('Bootstrap');
  logger.log(`App is ready and listening on port ${port} 🚀`);
  logger.log(`WebSocket is ready and listening on port ${wsPort} 🚀`);
}
bootstrap().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
});
