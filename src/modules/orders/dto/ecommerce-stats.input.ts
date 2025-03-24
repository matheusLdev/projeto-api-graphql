import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EcommerceStatsInput {
  @Field()
  secret: string;
}
