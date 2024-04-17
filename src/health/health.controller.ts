import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { MyLogger } from '@/logger/logger.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private logger: MyLogger) {
    this.logger.setContext(HealthController.name);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Health Check',
  })
  run() {
    this.logger.log('Endpoint called!');
    const health = { status: 'ok' };
    this.logger.log('Health check passed');
    return health;
  }
}
