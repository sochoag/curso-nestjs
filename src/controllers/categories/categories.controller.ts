import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  getCategory(@Param() params: any): string {
    return `Holi ${params.id} con ${params.productId}`
  }
}
