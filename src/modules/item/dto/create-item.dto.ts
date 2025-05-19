export class CreateItemDto {
  name: string;

  description: string;

  startingPrice: number;

  auctionDuration: number; // in minutes
}
