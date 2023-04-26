import { Module } from '@nestjs/common';
import { OrderRepositoryModule } from './order.repository';
import { ProductRepositoryModule } from './product.repository';

@Module({
  imports: [OrderRepositoryModule, ProductRepositoryModule],
  exports: [OrderRepositoryModule, ProductRepositoryModule],
})
export class RepositoryModule {}
