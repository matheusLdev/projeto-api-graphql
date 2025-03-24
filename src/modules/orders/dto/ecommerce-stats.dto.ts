import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class EcommerceStats {
  @Field()
  totalOrders: number;

  @Field()
  totalSales: number;

  @Field()
  totalProductsSold: number;

  @Field()
  avgOrderValue: number;
}
