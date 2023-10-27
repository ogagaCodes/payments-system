import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';


@Entity()
@Unique(['user_id'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  wallet_balance: number;

  @Column()
  last_funded_origin: string;

  @Column({ default: true })
  is_blocked: boolean;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
  updatedAt: Date

}