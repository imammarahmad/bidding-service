import { Bid } from 'src/modules/bid/entities/bid.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class Item {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  startingPrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  currentHighestBid: number;

  @Column()
  auctionDuration: number; // in minutes

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => Bid, (bid) => bid.item)
  bids: Bid[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
