import { Controller, Get, Query, Param, Post, Put, Body, Delete, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  // @Get('products')
  // getProducts(@Query() query: any): string {
  //   const { limit, offset } = query;
  //   return `products limit:${limit} y offset:${offset}`
  // }

  @Get()
  getProducts(
    @Query('limit') limit = 10,
    @Query('offset') offset = 30,
    @Query('brand') brand: string,
  ) {
    return {
      message: `Limit:${limit}, Offset:${offset}, Brand:${brand}`
    }
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `Holi soy un filtro`
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id') id: string) {
    return {
      message: `Holi ${id}`
    }
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Accion de crear',
      payload
    }
  }

  @Put(':id')
  update(@Param() params: any, @Body() payload: any) {
    return {
      message: 'Accion de actualizar',
      id: params.id,
      payload
    }
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return {
      message: 'Accion de eliminar',
      id: params.id,
    }
  }
}
