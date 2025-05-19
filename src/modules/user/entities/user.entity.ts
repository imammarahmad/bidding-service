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
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
