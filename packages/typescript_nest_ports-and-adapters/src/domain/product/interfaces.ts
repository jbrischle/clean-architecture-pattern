export type ProductModel = {
  id: string;
  name: string;
};

export interface ProductRepository {
  create(product: ProductModel): Promise<ProductModel>;

  get(productId: string): Promise<ProductModel | undefined>;

  getAll(): Promise<ProductModel[]>;
}

export interface ProductService {
  create(product: ProductModel): Promise<ProductModel>;

  get(productId: string): Promise<ProductModel | undefined>;

  getAll(): Promise<ProductModel[]>;
}
