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
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';
import { CategoriesService } from 'src/products/services/categories.service';

const controller_name = 'categories';

@ApiTags(controller_name[0].toUpperCase() + controller_name.slice(1))
@Controller(controller_name)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: `List all ${controller_name}` })
  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: `List ${controller_name} by id` })
  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: `Create ${controller_name}` })
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @ApiOperation({ summary: `Update ${controller_name} by id` })
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @ApiOperation({ summary: `Delete ${controller_name} by id` })
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.delete(id);
  }
}
