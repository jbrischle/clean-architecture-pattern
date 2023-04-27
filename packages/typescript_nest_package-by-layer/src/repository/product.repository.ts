import { Injectable, Module } from '@nestjs/common';

export interface ProductEntity {
  id: string;
  name: string;
}

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;

  get(productId: string): Promise<ProductEntity | undefined>;

  getAll(): Promise<ProductEntity[]>;
}

@Injectable()
class ProductRepositoryImpl implements ProductRepository {
  private productStore: Map<string, ProductEntity> = new Map<
    string,
    ProductEntity
  >();

  create(product: ProductEntity): Promise<ProductEntity> {
    this.productStore.set(product.id, product);
    return Promise.resolve(product);
  }

  get(productId: string): Promise<ProductEntity | undefined> {
    const product = this.productStore.get(productId);
    return Promise.resolve(product);
  }

  getAll(): Promise<ProductEntity[]> {
    return Promise.resolve(Array.from(this.productStore.values()));
  }
}

@Module({
  imports: [],
  providers: [
    { provide: 'ProductRepository', useClass: ProductRepositoryImpl },
  ],
  exports: ['ProductRepository'],
})
export class ProductRepositoryModule {}
