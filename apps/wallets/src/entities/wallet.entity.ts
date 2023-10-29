import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';


@Entity()
@Unique(['user_id'])
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  user_phone_number: string;

  @Column({ default: 0 })
  available_balance: number;

  @Column({default : 0})
  withdrawable_balance: number

  @Column()
  currency: string;

  @Column()
  wallet_pin: number;

  @Column()
  last_funded_origin: string;

  @Column({ default: false })
  is_blocked: boolean;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
  updatedAt: Date

}