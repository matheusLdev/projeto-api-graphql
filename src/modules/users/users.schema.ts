import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Users extends Document {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
