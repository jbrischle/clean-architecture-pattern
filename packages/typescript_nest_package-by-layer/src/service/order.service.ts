import { Inject, Injectable, Module } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { RepositoryModule } from '../repository/repository.module';

export interface OrderService {
  create(order: OrderModel): Promise<OrderModel>;

  get(orderId: string): Promise<OrderModel | undefined>;

  getAll(): Promise<OrderModel[]>;
}

type OrderModel = {
  id: string;
  productId: string;
  customerId: string;
  quantity: string;
};

@Injectable()
class OrderServiceImpl implements OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository
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
  imports: [RepositoryModule],
  providers: [{ provide: 'OrderService', useClass: OrderServiceImpl }],
  exports: ['OrderService'],
})
export class OrderServiceModule {}
