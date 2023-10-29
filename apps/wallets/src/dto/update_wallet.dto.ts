import { IsDate, IsInt, IsNotEmpty, IsString, Min, IsBoolean } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class DWalletDTO {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsInt()
  @IsNotEmpty()
  wallet_id: number;

  @IsInt()
  @IsNotEmpty()
  wallet_pin: number;
  
}
