import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { OrderController } from './controller/order.controller';
import { OrderServiceModule } from './domain/order/order.service';
import { ProductServiceModule } from './domain/product/product.service';

@Module({
  controllers: [ProductController, OrderController],
  imports: [OrderServiceModule, ProductServiceModule],
})
export class AppModule {}
