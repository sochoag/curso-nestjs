import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';
import { BrandsService } from 'src/products/services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getProducts() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(@Param() params: any, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(params.id, payload);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.brandsService.delete(params.id);
  }
}
