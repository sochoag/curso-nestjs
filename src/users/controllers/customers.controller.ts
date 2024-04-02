import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';
import { CustomersService } from 'src/users/services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  getProducts() {
    return this.customerService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put(':id')
  update(@Param() params: any, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(params.id, payload);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.customerService.delete(params.id);
  }
}
