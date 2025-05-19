import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BidService } from '../services/bid.service';
import { Bid } from '../entities/bid.entity';
import { BidDto, CreateBidDto } from '../dto/bid.dto';

@ApiTags('bids')
@Controller('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  @ApiOperation({ summary: 'Place a new bid' })
  @ApiBody({ type: CreateBidDto })
  @ApiResponse({
    status: 201,
    description: 'Bid placed successfully',
    type: BidDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid bid amount or auction ended',
  })
  @ApiResponse({ status: 404, description: 'User or item not found' })
  create(@Body() createBidDto: CreateBidDto): Promise<Bid> {
    return this.bidService.create(createBidDto.userId, createBidDto);
  }

  @Get('item/:itemId')
  @ApiOperation({ summary: 'Get all bids for an item' })
  @ApiParam({ name: 'itemId', description: 'Item ID' })
  @ApiResponse({
    status: 200,
    description: 'List of bids for the item',
    type: [BidDto],
  })
  getBidsForItem(@Param('itemId') itemId: string): Promise<Bid[]> {
    return this.bidService.getBidsForItem(itemId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all bids by a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'List of bids by the user',
    type: [BidDto],
  })
  getBidsForUser(@Param('userId') userId: string): Promise<Bid[]> {
    return this.bidService.getBidsForUser(userId);
  }
}
