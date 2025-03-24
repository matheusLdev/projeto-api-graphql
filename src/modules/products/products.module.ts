import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './products.schema';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
    ]),
    JwtModule,
    AuthModule,
  ],
  providers: [ProductsService, ProductsResolver, JwtAuthGuard],
  exports: [ProductsService, ProductsResolver, MongooseModule],
})
export class ProductsModule {}
