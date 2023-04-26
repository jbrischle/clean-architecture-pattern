import { Injectable, Module } from '@nestjs/common';

export interface ProductEntity {
  id: string;
  productName: string;
}

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;

  get(productId: string): Promise<ProductEntity | undefined>;
}

@Injectable()
class ProductRepositoryImpl implements ProductRepository {
  private productStore: ProductEntity[] = [];

  create(order: ProductEntity): Promise<ProductEntity> {
    this.productStore.push(order);
    return Promise.resolve(order);
  }

  get(productId: string): Promise<ProductEntity | undefined> {
    const product = this.productStore.find(
      (product) => product.id === productId,
    );
    return Promise.resolve(product);
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
