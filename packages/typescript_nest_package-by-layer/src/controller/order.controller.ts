import { Body, Controller, Get, Inject, Put, Query } from '@nestjs/common';
import { OrderModel, OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('OrderService') private readonly orderService: OrderService,
  ) {}

  @Put()
  create(@Body() order: OrderModel): Promise<OrderModel> {
    return this.orderService.create(order);
  }

  @Get()
  get(@Query('orderId') orderId: string): Promise<OrderModel | undefined> {
    return this.orderService.get(orderId);
  }
}
