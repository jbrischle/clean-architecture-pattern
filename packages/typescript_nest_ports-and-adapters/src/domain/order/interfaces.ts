export type OrderModel = {
  id: string;
  productId: string;
  customerId: string;
  quantity: string;
};

export interface OrderRepository {
  create(order: OrderModel): Promise<OrderModel>;

  get(orderId: string): Promise<OrderModel | undefined>;

  getAll(): Promise<OrderModel[]>;
}

export interface OrderService {
  create(order: OrderModel): Promise<OrderModel>;

  get(orderId: string): Promise<OrderModel | undefined>;

  getAll(): Promise<OrderModel[]>;
}
