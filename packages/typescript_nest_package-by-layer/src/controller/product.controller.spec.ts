import { Test, TestingModule } from '@nestjs/testing';
import { ServiceModule } from '../service/service.module';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let controller: ProductController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServiceModule],
      providers: [ProductController],
    }).compile();
    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create product', async () => {
    const orderId = Math.random().toString();
    const customerId = Math.random().toString();
    await controller.create({
      id: orderId,
      productName: 'newProduct',
    });

    const order = await controller.get(orderId);
    expect(order).toBeTruthy();
  });

  describe('get product by id', () => {
    it('should return document', async () => {
      const id = Math.random().toString();
      await controller.create({
        id: id,
        productName: 'new product',
      });

      const order = await controller.get(id);
      expect(order).toBeTruthy();
    });

    it('should return undefined', async () => {
      const order = await controller.get('Non existing id');
      expect(order).toBeFalsy();
    });
  });
});
