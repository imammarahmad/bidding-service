import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from '../dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const startTime = new Date();
    const endTime = new Date(
      startTime.getTime() + createItemDto.auctionDuration * 60000,
    );

    const item = this.itemRepository.create({
      ...createItemDto,
      startTime,
      endTime,
      isActive: true,
      currentHighestBid: createItemDto.startingPrice,
    });

    return this.itemRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    const now = new Date();
    return this.itemRepository.find({
      where: {
        isActive: true,
        endTime: MoreThan(now),
      },
      relations: ['bids'],
    });
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['bids'],
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async updateStatus(id: string, isActive: boolean): Promise<Item> {
    const item = await this.findOne(id);
    item.isActive = isActive;
    return this.itemRepository.save(item);
  }

  async updateHighestBid(id: string, amount: number): Promise<Item> {
    const item = await this.findOne(id);
    item.currentHighestBid = amount;
    return this.itemRepository.save(item);
  }
}
