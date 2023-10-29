import { IsDate, IsInt, IsNotEmpty, IsString, Min, IsBoolean } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class OperationTrackerDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @IsInt()
  @IsNotEmpty()
  wallet_id: number;

  @IsInt()
  @IsNotEmpty()
  freqency: number;

  @IsBoolean()
  @IsNotEmpty()
  has_exceeded_frequency_history: boolean;

  @IsNotEmpty()
  operation_type: string;
  
}
