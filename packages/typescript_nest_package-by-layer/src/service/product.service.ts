import { Inject, Injectable, Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { ProductRepository } from '../repository/product.repository';

type ProductModel = {
  id: string;
  name: string;
};

export interface ProductService {
  create(product: ProductModel): Promise<ProductModel>;

  get(productId: string): Promise<ProductModel | undefined>;

  getAll(): Promise<ProductModel[]>;
}

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
  imports: [RepositoryModule],
  providers: [{ provide: 'ProductService', useClass: ProductServiceImpl }],
  exports: ['ProductService'],
})
export class ProductServiceModule {}
