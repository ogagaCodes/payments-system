import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class CreditWalletDTO {
  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsNotEmpty()
  wallet_id: number;

  @ApiProperty({
    example: "+2348162968926",
    required: false,
  })
  @IsOptional()
  phone_number: string;

  @IsInt()
  @IsOptional()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  @Min(50)
  amount: number;
}
