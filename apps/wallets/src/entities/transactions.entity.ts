import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionType } from '../enums/transaction_type.enum';

@Entity()
@Unique(['user_id'])
export class WalletTransactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  user_phone_number: string;

  @Column({ type: 'enum', enum: TransactionType })
  transaction_type: TransactionType;

  @Column()
  current_balance: number;

  @Column()
  previous_balance: number;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  funding_origin: string;

  @Column({ default: true })
  is_blocked: boolean;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;
}
