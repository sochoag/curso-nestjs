import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Put,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';
import { ProductsService } from 'src/products/services/products.service';

const controller_name = 'products';

@ApiTags(controller_name[0].toUpperCase() + controller_name.slice(1))
@Controller(controller_name)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: `List all ${controller_name}` })
  @Get()
  getAll(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @ApiOperation({ summary: `List ${controller_name} by id` })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: `Create ${controller_name}` })
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @ApiOperation({ summary: `Update ${controller_name} by id` })
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @ApiOperation({ summary: `Delete ${controller_name} by id` })
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.delete(id);
  }
}
