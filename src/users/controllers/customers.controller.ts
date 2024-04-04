import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';
import { CustomersService } from 'src/users/services/customers.service';

const controller_name = 'customers';

@ApiTags(controller_name[0].toUpperCase() + controller_name.slice(1))
@Controller(controller_name)
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @ApiOperation({ summary: `List all ${controller_name}` })
  @Get()
  getAll() {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: `List ${controller_name} by id` })
  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.customerService.findOne(id);
  }

  @ApiOperation({ summary: `Create ${controller_name}` })
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @ApiOperation({ summary: `Update ${controller_name} by id` })
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(id, payload);
  }

  @ApiOperation({ summary: `Delete ${controller_name} by id` })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
