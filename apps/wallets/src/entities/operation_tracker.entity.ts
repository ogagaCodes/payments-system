import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';


@Entity()
@Unique(['wallet_id'])
export class WalletFrequencyCounter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wallet_id: number;

  @Column()
  operation_type: string;

  @Column()
  freqency: number;

  @Column()
  has_exceeded_frequency_history: boolean;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
  updatedAt: Date

}