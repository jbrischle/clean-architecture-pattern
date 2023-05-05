import { Inject, Injectable, Module } from '@nestjs/common';
import { OrderModel, OrderRepository, OrderService } from './interfaces';
import { OrderRepositoryModule } from '../../repository/order.repository';

@Injectable()
class OrderServiceImpl implements OrderService {
  constructor(
    @Inject('OrderRepository') private readonly orderRepository: OrderRepository
  ) {}

  create(order: OrderModel): Promise<OrderModel> {
    order.id = crypto.randomUUID();
    order.customerId = 'authService.getRequestUserId';
    return this.orderRepository.create(order);
  }

  get(orderId: string): Promise<OrderModel | undefined> {
    return this.orderRepository.get(orderId);
  }

  getAll(): Promise<OrderModel[]> {
    return this.orderRepository.getAll();
  }
}

@Module({
  imports: [OrderRepositoryModule],
  providers: [{ provide: 'OrderService', useClass: OrderServiceImpl }],
  exports: ['OrderService'],
})
export class OrderServiceModule {}
