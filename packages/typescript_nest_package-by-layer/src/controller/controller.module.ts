import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ServiceModule } from '../service/service.module';
import { RepositoryModule } from '../repository/repository.module';
import { ProductController } from './product.controller';

@Module({
  controllers: [OrderController, ProductController],
  imports: [ServiceModule, RepositoryModule],
})
export class ControllerModule {}
