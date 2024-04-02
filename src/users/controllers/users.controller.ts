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
import { ParseIntPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getProducts() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(@Param() params: any, @Body() payload: UpdateUserDto) {
    return this.userService.update(params.id, payload);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.userService.delete(params.id);
  }
}
