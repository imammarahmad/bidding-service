import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Bid } from '../entities/bid.entity';
import { CreateBidDto } from '../dto/create-bid.dto';
import { ItemService } from '../../item/services/item.service';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
    private readonly userService: UserService,
    private readonly itemService: ItemService,
    private readonly dataSource: DataSource,
  ) {}

  async create(userId: string, createBidDto: CreateBidDto): Promise<Bid> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const item = await this.itemService.findOne(createBidDto.itemId);
      if (!item) {
        throw new BadRequestException('Item not found');
      }

      if (!item.isActive) {
        throw new BadRequestException('Auction has ended');
      }

      if (new Date() > item.endTime) {
        await this.itemService.updateStatus(item.id, false);
        throw new BadRequestException('Auction has ended');
      }

      if (createBidDto.amount <= item.currentHighestBid) {
        throw new BadRequestException(
          'Bid must be higher than current highest bid',
        );
      }

      // Update the highest bid
      await this.itemService.updateHighestBid(item.id, createBidDto.amount);

      // Create the bid
      const bid = this.bidRepository.create({
        user,
        item,
        amount: createBidDto.amount,
      });

      const savedBid = await queryRunner.manager.save(bid);
      await queryRunner.commitTransaction();
      return savedBid;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getBidsForItem(itemId: string): Promise<Bid[]> {
    return this.bidRepository.find({
      where: { item: { id: itemId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getBidsForUser(userId: string): Promise<Bid[]> {
    return this.bidRepository.find({
      where: { user: { id: userId } },
      relations: ['item'],
      order: { createdAt: 'DESC' },
    });
  }
}
