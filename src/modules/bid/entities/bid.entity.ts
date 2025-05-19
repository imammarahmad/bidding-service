import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';
import { User } from '../../user/entities/user.entity';
import { Item } from '../../item/entities/item.entity';

@Entity()
export class Bid {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user: User) => user.bids)
  user: User;

  @ManyToOne(() => Item, (item: Item) => item.bids)
  item: Item;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
