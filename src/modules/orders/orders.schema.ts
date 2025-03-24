import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OrderStatus } from './enum/order-status.enum';

@ObjectType()
class OrderItem {
  @Field(() => ID)
  product: Types.ObjectId;

  @Field()
  quantity: number;
}

@Schema({ timestamps: true })
@ObjectType()
export class Orders extends Document {
  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  user: Types.ObjectId;

  @Field(() => [OrderItem])
  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: 'Products' },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  })
  items: { product: Types.ObjectId; quantity: number }[];
 
  @Field(() => OrderStatus)
  @Prop({ default: OrderStatus.PENDING, enum: OrderStatus })
  status: OrderStatus;
  
  @Field()
  @Prop({ required: true })
  total: number;

  @Field(() => ID)
  get orderId(): string {
    return (this._id as Types.ObjectId).toHexString();
  }
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
