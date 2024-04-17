import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configLoader } from '@/config/config-loader';
import { envSchema } from '@/config/env-schema';
import { HealthModule } from '@/health/health.module';
import { LoggerModule } from '@/logger/logger.module';
import { LoggerMiddleware } from '@/utils/middlewares/logger.middleware';
import { GatewayModule } from '@/websockets/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configLoader],
      validationSchema: envSchema,
    }),
    LoggerModule,
    HealthModule,
    GatewayModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
