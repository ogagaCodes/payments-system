import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';


@Entity()
@Unique(['wallet_id'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wallet_id: string;

  @Column()
  operation_type: number;

  @Column()
  freqency: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
  updatedAt: Date

}