import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Orders } from './orders.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Products } from '../products/products.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders.name) private ordersModel: Model<Orders>,
    @InjectModel(Products.name) private productsModel: Model<Products>
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const itemsWithIds = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.productsModel.findOne({ name: item.product });
  
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
  
        return {
          product: new Types.ObjectId(product._id as string),
          quantity: item.quantity,
        };
      }),
    );
  
    const order = new this.ordersModel({
      ...createOrderDto,
      items: itemsWithIds,
    });
  
    return order.save();
  }

  async getOrdersByUser(userId: string): Promise<Orders[]> {
    try {
      return this.ordersModel.find({ user: new Types.ObjectId(userId) }).exec();
    } catch (error) {
      console.error('Error retrieving orders', error);
      throw new Error('Error retrieving orders');
    }
  }

  async getOrderById(id: string): Promise<Orders> {
    const order = await this.ordersModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async getEcommerceStats() {
    const totalOrders = await this.ordersModel.countDocuments();
    const totalSalesData = await this.ordersModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          totalProductsSold: { $sum: '$quantity' },
        },
      },
    ]);

    const totalSales = totalSalesData[0]?.totalRevenue || 0;
    const totalProductsSold = totalSalesData[0]?.totalProductsSold || 0;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    return {
      totalOrders,
      totalSales,
      totalProductsSold,
      avgOrderValue,
    };
  }

  async updateOrderStatus(id: string, status: string): Promise<Orders> {
    const order = await this.ordersModel
      .findByIdAndUpdate(
        id,
        { status },
        { new: true },
      )
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }
}
