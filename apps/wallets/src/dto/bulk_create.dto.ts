import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { CurrencyType } from '../enums/wallet_currency.enum';

export class BulkCreateWalletDTO {
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  number_of_wallets: number;

  @IsNotEmpty()
  user_phone_number: string;
  
  @IsNotEmpty()
  @IsEnum(CurrencyType)
  currency: CurrencyType;
}
