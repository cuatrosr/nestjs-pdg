import { HttpException, HttpStatus } from '@nestjs/common';

export const HttpNotFound = (name: string) => {
  throw new HttpException(`NotFound: ${name}`, HttpStatus.NOT_FOUND);
};

export const HttpBadRequest = (name: string) => {
  throw new HttpException(`BadRequest: ${name}`, HttpStatus.BAD_REQUEST);
};

export const HttpUnauthorized = (name: string) => {
  throw new HttpException(`Unauthorized: ${name}`, HttpStatus.UNAUTHORIZED);
};

export const HttpDBError = (name: string) => {
  throw new HttpException(
    `Server Error: ${name}`,
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
