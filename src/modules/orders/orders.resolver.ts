import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Orders } from './orders.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { ConfigService } from '@nestjs/config';
import { EcommerceStatsInput } from './dto/ecommerce-stats.input';
import { CreateOrderDto } from './dto/create-order.dto';
import { EcommerceStats } from './dto/ecommerce-stats.dto';

@Resolver(() => Orders)
export class OrdersResolver {
  constructor(
    private readonly configService: ConfigService,
    private readonly ordersService: OrdersService,
  ) {}

  @Query(() => [Orders])
  @UseGuards(JwtAuthGuard)
  async orders(@Context() context: any): Promise<Orders[]> {
    const userId = context.req.user?.sub;
    return this.ordersService.getOrdersByUser(userId);
  }

  @Query(() => Orders)
  async order(@Args('id', { type: () => String }) id: string): Promise<Orders> {
    return this.ordersService.getOrderById(id);
  }

  @Query(() => EcommerceStats)
  async ecommerceStats(@Args('input') input: EcommerceStatsInput) {
    const validSecret = this.configService.get<string>('SUPER_SECRET_TOKEN');
    if (input.secret !== validSecret) {
      throw new Error('Invalid secret key');
    }

    return this.ordersService.getEcommerceStats();
  }

  @Mutation(() => Orders)
  @UseGuards(JwtAuthGuard)
  async placeOrder(
    @Args('createOrderDto') createOrderDto: CreateOrderDto,
  ): Promise<Orders> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Mutation(() => Orders)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateOrderStatus(
    @Args('id', { type: () => String }) id: string,
    @Args('status') status: string,
  ): Promise<Orders> {
    return this.ordersService.updateOrderStatus(id, status);
  }
}
