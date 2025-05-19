import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty({ description: 'The unique identifier of the item' })
  id: string;

  @ApiProperty({ description: 'The name of the item' })
  name: string;

  @ApiProperty({ description: 'The description of the item' })
  description: string;

  @ApiProperty({ description: 'The starting price of the item' })
  startingPrice: number;

  @ApiProperty({ description: 'The current highest bid for the item' })
  currentHighestBid: number;

  @ApiProperty({ description: 'The duration of the auction in minutes' })
  auctionDuration: number;

  @ApiProperty({ description: 'The start time of the auction' })
  startTime: Date;

  @ApiProperty({ description: 'The end time of the auction' })
  endTime: Date;

  @ApiProperty({ description: 'Whether the auction is currently active' })
  isActive: boolean;
}

export class CreateItemDto {
  @ApiProperty({ description: 'The name of the item' })
  name: string;

  @ApiProperty({ description: 'The description of the item' })
  description: string;

  @ApiProperty({ description: 'The starting price of the item' })
  startingPrice: number;

  @ApiProperty({ description: 'The duration of the auction in minutes' })
  auctionDuration: number;
}
