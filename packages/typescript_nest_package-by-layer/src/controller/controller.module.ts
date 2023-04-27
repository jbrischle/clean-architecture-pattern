import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ServiceModule } from '../service/service.module';
import { ProductController } from './product.controller';

@Module({
  controllers: [OrderController, ProductController],
  imports: [ServiceModule],
})
export class ControllerModule {}
