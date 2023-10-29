import { IsDate, IsInt, IsNotEmpty, IsString, Min, IsBoolean } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class DebitWalletDTO {
    @IsNotEmpty()
    wallet_id: number;
  
    @IsNotEmpty()
    phone_number: string;
  
    @IsInt()
    @IsNotEmpty()
    user_id: number;
  
    @IsInt()
    @Min(50)
    amount: number;
  
}
