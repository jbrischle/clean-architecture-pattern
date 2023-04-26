import { Module } from '@nestjs/common';
import { OrderServiceModule } from './order.service';
import { RepositoryModule } from '../repository/repository.module';
import { ProductServiceModule } from './product.service';

@Module({
  imports: [RepositoryModule, OrderServiceModule, ProductServiceModule],
  exports: [OrderServiceModule, ProductServiceModule],
})
export class ServiceModule {}
