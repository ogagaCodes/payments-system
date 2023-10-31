import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsBoolean, IsEnum } from 'class-validator';


import { CurrencyType } from '../enums/wallet_currency.enum';

export class WebHookDTO {
  @IsNotEmpty()
  body: object;

  @IsNotEmpty()
  headers: string

}
