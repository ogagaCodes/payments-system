import { IsNotEmpty } from 'class-validator';

export class FetchProfileDTO {
  @IsNotEmpty()
  phone_number: string;
}