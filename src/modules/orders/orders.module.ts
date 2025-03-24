import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from './orders.schema';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
    ConfigModule,
    JwtModule,
    ProductsModule,
  ],
  providers: [OrdersService, OrdersResolver],
  exports: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
