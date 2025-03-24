import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsArray, ValidateNested, IsMongoId, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class OrderItemInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @Field()
  @IsNumber()
  @Min(1)
  quantity: number;
}

@InputType()
export class CreateOrderDto {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @Field(() => [OrderItemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items: OrderItemInput[];

  @Field()
  @IsNumber()
  @Min(0)
  total: number;
}
