import { Injectable, Module } from '@nestjs/common';

export interface OrderEntity {
  id: string;
  productId: string;
  customerId: string;
  quantity: string;
}

export interface OrderRepository {
  create(order: OrderEntity): Promise<OrderEntity>;

  get(orderId: string): Promise<OrderEntity | undefined>;
}

@Injectable()
class OrderRepositoryImpl implements OrderRepository {
  private orderStore: OrderEntity[] = [];

  create(order: OrderEntity): Promise<OrderEntity> {
    this.orderStore.push(order);
    return Promise.resolve(order);
  }

  get(orderId: string): Promise<OrderEntity | undefined> {
    const order = this.orderStore.find((order) => order.id === orderId);
    return Promise.resolve(order);
  }
}

@Module({
  imports: [],
  providers: [{ provide: 'OrderRepository', useClass: OrderRepositoryImpl }],
  exports: ['OrderRepository'],
})
export class OrderRepositoryModule {}
