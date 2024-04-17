import Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  WEBSOCKET_PORT: Joi.number().default(3500),
  WEBSOCKET_CORS_ORIGIN: Joi.string().default(true),
});
