import { IsNotEmpty, IsUUID } from 'class-validator';

export class WebcomponentDTO {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
}
