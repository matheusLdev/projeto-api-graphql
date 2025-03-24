import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from './products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<Products>,
  ) {}

  async createProduct(
    name: string,
    description: string,
    price: number,
    stock: number,
  ): Promise<Products> {
    try {
      const product = new this.productsModel({
        name,
        description,
        price,
        stock,
      });
      return await product.save();
    } catch (error) {
      console.error('Error creating product', error);
      throw new Error('Error creating product');
    }
  }

  async getAllProducts(): Promise<Products[]> {
    try {
      return await this.productsModel.find().exec();
    } catch (error) {
      console.error('Error retrieving products', error);
      throw new Error('Error retrieving products');
    }
  }

  async deleteAll() {
    await this.productsModel.deleteMany({});
  }
}
