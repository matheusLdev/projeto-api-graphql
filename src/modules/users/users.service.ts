import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.usersModel.findOne({ email }).lean().exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(
    name: string,
    email: string,
    password: string,
    role?: string,
  ): Promise<Users> {
    const user = new this.usersModel({ name, email, password, role });
    return user.save();
  }

  async deleteAll() {
    await this.usersModel.deleteMany({});
  }
}
