import { IsDate, IsInt, IsNotEmpty, IsString, Min, IsBoolean } from 'class-validator';


export class WalletTransferDTO {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  receiver_wallet_id: number;

  @IsNotEmpty()
  sender_wallet_id: number;

  @IsInt()
  @Min(50)
  transfer_amount: number;
  
}
