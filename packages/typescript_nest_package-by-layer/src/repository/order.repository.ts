import { Injectable, Module } from '@nestjs/common';

export interface OrderRepository {
  create(order: OrderEntity): Promise<OrderEntity>;

  get(orderId: string): Promise<OrderEntity | undefined>;

  getAll(): Promise<OrderEntity[]>;
}

type OrderEntity = {
  id: string;
  productId: string;
  customerId: string;
  quantity: string;
};

@Injectable()
class OrderRepositoryImpl implements OrderRepository {
  private orderStore: Map<string, OrderEntity> = new Map<string, OrderEntity>();

  create(order: OrderEntity): Promise<OrderEntity> {
    this.orderStore.set(order.id, order);
    return Promise.resolve(order);
  }

  get(orderId: string): Promise<OrderEntity | undefined> {
    const order = this.orderStore.get(orderId);
    return Promise.resolve(order);
  }

  getAll(): Promise<OrderEntity[]> {
    return Promise.resolve(Array.from(this.orderStore.values()));
  }
}

@Module({
  imports: [],
  providers: [{ provide: 'OrderRepository', useClass: OrderRepositoryImpl }],
  exports: ['OrderRepository'],
})
export class OrderRepositoryModule {}
