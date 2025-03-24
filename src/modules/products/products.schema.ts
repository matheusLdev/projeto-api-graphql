import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

@Schema({ timestamps: true })
@ObjectType()
export class Products extends Document {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ required: true })
  price: number;

  @Field()
  @Prop({ required: true })
  stock: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
