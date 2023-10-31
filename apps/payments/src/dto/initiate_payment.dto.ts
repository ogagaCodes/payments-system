import {
    IsInt,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    IsNotEmpty,
  } from 'class-validator';
  
  export class InitiatePayment {
    @IsNotEmpty()
    user_id: string;
  
    @IsInt()
    @Min(0)
    amount: number;
  
    @IsEmail()
    email: string;

  }
  