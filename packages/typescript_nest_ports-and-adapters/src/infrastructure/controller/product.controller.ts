import { Body, Controller, Get, Inject, Put, Query } from '@nestjs/common';
import { ProductService } from '../../domain/product/interfaces';

export type ProductDto = {
  id: string;
  name: string;
};

@Controller('product')
export class ProductController {
  constructor(
    @Inject('ProductService') private readonly productService: ProductService
  ) {}

  @Put()
  create(@Body() order: ProductDto): Promise<ProductDto> {
    return this.productService.create(order);
  }

  @Get()
  async get(@Query('productId') productId: string): Promise<ProductDto[]> {
    if (productId) {
      const product = await this.productService.get(productId);
      return product ? [product] : [];
    } else {
      return await this.productService.getAll();
    }
  }
}
