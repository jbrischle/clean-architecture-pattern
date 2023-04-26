import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { ServiceModule } from '../service/service.module';

describe('OrderController', () => {
  let controller: OrderController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServiceModule],
      providers: [OrderController],
    }).compile();
    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create order', async () => {
    const orderId = Math.random().toString();
    const customerId = Math.random().toString();
    await controller.create({
      id: orderId,
      customerId: customerId,
      productId: Math.random().toString(),
      quantity: '1',
    });

    const order = await controller.get(orderId);
    expect(order).toBeTruthy();
  });

  describe('get order by id', () => {
    it('should return document', async () => {
      const orderId = Math.random().toString();
      const customerId = Math.random().toString();
      await controller.create({
        id: orderId,
        customerId: customerId,
        productId: Math.random().toString(),
        quantity: '1',
      });

      const order = await controller.get(orderId);
      expect(order).toBeTruthy();
    });

    it('should return undefined', async () => {
      const order = await controller.get('Non existing id');
      expect(order).toBeFalsy();
    });
  });
});
