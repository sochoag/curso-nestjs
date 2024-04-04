import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'User 1',
      password: 'Descripcion',
      role: 'Boss',
    },
  ];

  findAll() {
    console.log(this.configService.get('API_KEY'));
    console.log(this.configService.get('DATABASE_NAME'));
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id == id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const idx = this.users.findIndex((item) => item.id == id);
      this.users[idx] = {
        ...user,
        ...payload,
      };
      return this.users[idx];
    }
    return null;
  }

  delete(id: number) {
    const idx = this.users.findIndex((item) => item.id == id);
    if (idx === -1) {
      throw new NotFoundException(`User ${id} not found`);
    }
    const user = this.findOne(id);
    this.users.splice(idx, 1);
    return user;
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
