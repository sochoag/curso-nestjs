import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Descripcion',
      price: 10,
      stock: 100,
      image: 'imageURL',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id == id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const idx = this.products.findIndex((item) => item.id == id);
      this.products[idx] = {
        ...product,
        ...payload,
      };
      return this.products[idx];
    }
    return null;
  }

  delete(id: number) {
    const idx = this.products.findIndex((item) => item.id == id);
    if (idx === -1) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    const product = this.findOne(id);
    this.products.splice(idx, 1);
    return product;
  }
}
