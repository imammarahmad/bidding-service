import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';

import { UserModule } from '../user/user.module';
import { ItemModule } from '../item/item.module';
import { BidController } from './controllers/bid.controller';
import { BidService } from './services/bid.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bid]), UserModule, ItemModule],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
