import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCustomerDto,
  FilterCustomersDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';
import { Customer } from 'src/users/entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll(params?: FilterCustomersDto) {
    if (params) {
      const { limit, offset } = params;
      return await this.customerModel.find().skip(offset).limit(limit);
    }
    return await this.customerModel.find();
  }

  async findOne(id: string) {
    const customer = this.customerModel.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(payload: CreateCustomerDto) {
    const newCustomer = new this.customerModel(payload);
    return await newCustomer.save();
  }

  async update(id: string, payload: UpdateCustomerDto) {
    const customer = await this.customerModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async delete(id: string) {
    const customer = await this.customerModel.findByIdAndDelete(id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }
}
