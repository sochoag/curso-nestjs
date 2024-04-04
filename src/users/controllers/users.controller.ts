import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

const controller_name = 'users';

@ApiTags(controller_name[0].toUpperCase() + controller_name.slice(1))
@Controller(controller_name)
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: `List all ${controller_name}` })
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: `List ${controller_name} by id` })
  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: `List ${controller_name} orders by id` })
  @Get(':id/orders')
  getOrders(@Param('id', MongoIdPipe) id: string) {
    return this.userService.getOrdersByUser(id);
  }

  @ApiOperation({ summary: `Create ${controller_name}` })
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @ApiOperation({ summary: `Update ${controller_name} by id` })
  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @ApiOperation({ summary: `Delete ${controller_name} by id` })
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.userService.delete(id);
  }
}
