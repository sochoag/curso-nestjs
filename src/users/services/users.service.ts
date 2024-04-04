import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { FilterQuery, Model } from 'mongoose';
import { Order } from '../entities/order.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = new this.userModel(payload);
    return await newUser.save();
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async getOrdersByUser(id: string) {
    const filter: FilterQuery<Order> = { user: id };
    const orders = await this.orderModel.find(filter);
    if (!orders) {
      throw new NotFoundException(`Cant find orders from user ${id}`);
    }
  }
}
