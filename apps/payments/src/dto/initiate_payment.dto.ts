import {
    IsInt,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    IsNotEmpty,
  } from 'class-validator';
  
  export class Post {
    @IsNotEmpty()
    user_id: string;
  
    @IsInt()
    @Min(0)
    amount: number;
  
    @IsEmail()
    email: string;
  
    @IsFQDN()
    site: string;
  
    @IsDate()
    createDate: Date;

    @IsDate()
    updatedDate: Date;
  }
  