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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';
import { BrandsService } from 'src/products/services/brands.service';

const controller_name = 'brands';

@ApiTags(controller_name[0].toUpperCase() + controller_name.slice(1))
@Controller(controller_name)
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @ApiOperation({ summary: `List all ${controller_name}` })
  @Get()
  getAll() {
    return this.brandsService.findAll();
  }

  @ApiOperation({ summary: `List ${controller_name} by id` })
  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.findOne(id);
  }

  @ApiOperation({ summary: `Create ${controller_name}` })
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @ApiOperation({ summary: `Update ${controller_name} by id` })
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @ApiOperation({ summary: `Delete ${controller_name} by id` })
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.delete(id);
  }
}
