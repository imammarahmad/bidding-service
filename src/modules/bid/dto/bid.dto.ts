import { ApiProperty } from '@nestjs/swagger';

export class BidDto {
  @ApiProperty({ description: 'The unique identifier of the bid' })
  id: string;

  @ApiProperty({ description: 'The amount of the bid' })
  amount: number;

  @ApiProperty({ description: 'The time when the bid was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The user who made the bid' })
  user: {
    id: string;
    name: string;
  };

  @ApiProperty({ description: 'The item being bid on' })
  item: {
    id: string;
    name: string;
  };
}

export class CreateBidDto {
  @ApiProperty({ description: 'The ID of the user making the bid' })
  userId: string;

  @ApiProperty({ description: 'The ID of the item being bid on' })
  itemId: string;

  @ApiProperty({ description: 'The amount of the bid' })
  amount: number;
}
