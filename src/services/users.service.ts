import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';
@Injectable()
export class UsersService {
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
}
