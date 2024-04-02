import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dto';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Customer 1',
      lastName: 'Descripcion',
      phone: '+593987654247',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id == id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    if (customer) {
      const idx = this.customers.findIndex((item) => item.id == id);
      this.customers[idx] = {
        ...customer,
        ...payload,
      };
      return this.customers[idx];
    }
    return null;
  }

  delete(id: number) {
    const idx = this.customers.findIndex((item) => item.id == id);
    if (idx === -1) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    const customer = this.findOne(id);
    this.customers.splice(idx, 1);
    return customer;
  }
}
