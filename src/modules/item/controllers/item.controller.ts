import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ItemService } from '../services/item.service';
import { Item } from '../entities/item.entity';
import { ItemDto, CreateItemDto } from '../dto/item.dto';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item for auction' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({
    status: 201,
    description: 'Item created successfully',
    type: ItemDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active items' })
  @ApiResponse({
    status: 200,
    description: 'List of all active items',
    type: [ItemDto],
  })
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({
    status: 200,
    description: 'Item found',
    type: ItemDto,
  })
  @ApiResponse({ status: 404, description: 'Item not found' })
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }
}
