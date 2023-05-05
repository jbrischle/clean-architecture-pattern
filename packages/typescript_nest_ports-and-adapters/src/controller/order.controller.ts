import { Body, Controller, Get, Inject, Put, Query } from '@nestjs/common';
import { OrderService } from '../domain/order/interfaces';

export type OrderDto = {
  id: string;
  productId: string;
  customerId: string;
  quantity: string;
};

@Controller('order')
export class OrderController {
  constructor(
    @Inject('OrderService') private readonly orderService: OrderService
  ) {}

  @Put()
  create(@Body() order: OrderDto): Promise<OrderDto> {
    return this.orderService.create(order);
  }

  @Get()
  async get(@Query('orderId') orderId: string): Promise<OrderDto[]> {
    if (orderId) {
      const order = await this.orderService.get(orderId);
      return order ? [order] : [];
    } else {
      return await this.orderService.getAll();
    }
  }
}
