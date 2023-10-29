import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsBoolean, IsEnum } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

import { CurrencyType } from '../enums/wallet_currency.enum';

export class WalletDTO {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  user_phone_number: string;

  @IsNotEmpty()
  @IsEnum(CurrencyType)
  currency: CurrencyType;
  
  @IsBoolean()
  @Transform(({ value} ) => value === 'true')
  public is_blocked: boolean;

  @IsDate()
  createDate: Date;

  @IsDate()
  updatedDate: Date;
}
