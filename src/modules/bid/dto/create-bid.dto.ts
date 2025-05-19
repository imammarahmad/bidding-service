import { ApiProperty } from '@nestjs/swagger';

export class CreateBidDto {
  @ApiProperty({ description: 'The ID of the user making the bid' })
  userId: string;

  @ApiProperty({ description: 'The ID of the item being bid on' })
  itemId: string;

  @ApiProperty({ description: 'The amount of the bid' })
  amount: number;
}
