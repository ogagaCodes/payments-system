import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PrimaryGeneratedColumn } from 'typeorm';

export class UsersDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  phone_number: string;

  @IsOptional()
  @IsString()
  user_name?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  public has_multiple_wallets: boolean;
}
