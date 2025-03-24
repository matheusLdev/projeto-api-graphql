import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Products } from './products.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@Resolver(() => Products)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Products])
  async products(): Promise<Products[]> {
    return this.productsService.getAllProducts();
  }

  @Mutation(() => Products)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async addProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('price') price: number,
    @Args('stock') stock: number,
  ): Promise<Products> {
    return this.productsService.createProduct(name, description, price, stock);
  }
}
