export const configLoader = () => {
  return {
    PORT: process.env.PORT,
    WEBSOCKET_PORT: process.env.WEBSOCKET_PORT,
    WEBSOCKET_CORS_ORIGIN: process.env.WEBSOCKET_CORS_ORIGIN,
  };
};
