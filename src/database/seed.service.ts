import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { ProductsService } from 'src/modules/products/products.service';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { OrdersService } from 'src/modules/orders/orders.service';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';

@Injectable()
export class SeedService {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  async seed() {
    await this.clearDatabase();
    await this.createAdminUser();
    await this.createClientUser();
    await this.generateProducts(10);
    await this.createOrderForUser();
  }

  private async clearDatabase() {
    await this.productsService.deleteAll();
    await this.usersService.deleteAll();
  }

  private async createAdminUser() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await this.usersService.create(
      'Admin',
      'admin@admin.com',
      hashedPassword,
      'admin',
    );
  }

  private async createClientUser() {
    const hashedPassword = await bcrypt.hash('user123', 10);
    await this.usersService.create(
      'User',
      'user@user.com',
      hashedPassword,
      'user',
    );
  }

  private async generateProducts(count: number) {
    const products = [];
    for (let i = 0; i < count; i++) {
      const product = await this.productsService.createProduct(
        faker.commerce.productName(),
        faker.commerce.productDescription(),
        parseFloat(faker.commerce.price()),
        faker.number.int({ min: 1, max: 100 }),
      );
      products.push(product);
    }
    return products;
  }

  private async createOrderForUser() {
    const user = await this.usersService.findByEmail('user@user.com');

    const products = await this.productsService.getAllProducts();

    const items = products.slice(0, 3).map((product) => ({
      product: product,
      quantity: faker.number.int({ min: 1, max: 3 }),
    }));

    const total = items.reduce((sum, item) => {
      const product = products.find((p) => p._id === item.product);
      return product ? sum + item.quantity * product.price : sum;
    }, 0);

    const createOrder: CreateOrderDto = {
      user: user._id as string,
      items: items.map((item) => ({
        product: item.product.name as string,
        quantity: item.quantity,
      })),
      total,
    };

    await this.ordersService.createOrder(createOrder);
  }
}
