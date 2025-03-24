import { Resolver, Query } from '@nestjs/graphql';
import { Users } from './users.schema';
import { UsersService } from './users.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Users])
  async getUsers(): Promise<Users[]> {
    return this.usersService.findAll();
  }
}
