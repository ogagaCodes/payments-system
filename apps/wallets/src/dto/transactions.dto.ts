import { IsEnum, IsInt, IsNotEmpty, IsString, Min, IsBoolean, IsEmail } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from '../enums/transaction_type.enum';

export class WalletTransactionsDTO {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsInt()
  @IsNotEmpty()
  wallet_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  amount: number;

  @IsInt()
  previous_balance: number;

  @IsInt()
  current_balance: number;

  @IsNotEmpty()
  user_phone_number: string;

  @IsNotEmpty()
  funding_origin: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  transaction_type:TransactionType;

  @IsNotEmpty()
  origin: string;

}
