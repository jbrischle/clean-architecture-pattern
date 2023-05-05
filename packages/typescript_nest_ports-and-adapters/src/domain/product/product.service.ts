import { Inject, Injectable, Module } from '@nestjs/common';
import { ProductModel, ProductRepository, ProductService } from './interfaces';
import { ProductRepositoryModule } from '../../repository/product.repository';

@Injectable()
class ProductServiceImpl implements ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository
  ) {}

  create(product: ProductModel): Promise<ProductModel> {
    product.id = crypto.randomUUID();
    return this.productRepository.create(product);
  }

  get(productId: string): Promise<ProductModel | undefined> {
    return this.productRepository.get(productId);
  }

  getAll(): Promise<ProductModel[]> {
    return this.productRepository.getAll();
  }
}

@Module({
  imports: [ProductRepositoryModule],
  providers: [{ provide: 'ProductService', useClass: ProductServiceImpl }],
  exports: ['ProductService'],
})
export class ProductServiceModule {}
