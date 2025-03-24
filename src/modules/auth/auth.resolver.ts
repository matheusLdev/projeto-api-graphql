import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtToken } from './dto/jwt-token.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => JwtToken)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
  ): Promise<JwtToken> {
    const token = await this.authService.register(registerDto);
    return { access_token: token };
  }

  @Mutation(() => JwtToken)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<JwtToken> {
    const token = await this.authService.login(loginDto);
    return { access_token: token };
  }
}
