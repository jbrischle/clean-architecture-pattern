import { Body, Controller, Get, Inject, Put, Query } from '@nestjs/common';
import { ProductModel, ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(
    @Inject('ProductService') private readonly productService: ProductService,
  ) {}

  @Put()
  create(@Body() order: ProductModel): Promise<ProductModel> {
    return this.productService.create(order);
  }

  @Get()
  get(
    @Query('productId') productId: string,
  ): Promise<ProductModel | undefined> {
    return this.productService.get(productId);
  }
}
