import { Inject, Injectable, Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { ProductRepository } from '../repository/product.repository';

export interface ProductModel {
  id: string;
  productName: string;
}

export interface ProductService {
  create(product: ProductModel): Promise<ProductModel>;

  get(productId: string): Promise<ProductModel | undefined>;
}

@Injectable()
class ProductServiceImpl implements ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  create(order: ProductModel): Promise<ProductModel> {
    return this.productRepository.create(order);
  }

  get(productId: string): Promise<ProductModel | undefined> {
    return this.productRepository.get(productId);
  }
}

@Module({
  imports: [RepositoryModule],
  providers: [{ provide: 'ProductService', useClass: ProductServiceImpl }],
  exports: ['ProductService'],
})
export class ProductServiceModule {}
