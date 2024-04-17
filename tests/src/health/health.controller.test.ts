import { createMock } from '@golevelup/ts-jest';

import { HealthController } from '@/health/health.controller';
import { MyLogger } from '@/logger/logger.service';

describe('HealthController', () => {
  let healthController: HealthController;
  let logger: jest.Mocked<MyLogger>;

  beforeEach(() => {
    logger = createMock<MyLogger>();
    healthController = new HealthController(logger);
  });

  describe('run', () => {
    it('should return is healthy', () => {
      expect(healthController.run()).toEqual({ status: 'ok' });
      expect(logger.log).toHaveBeenCalledTimes(2);
    });
  });
});
