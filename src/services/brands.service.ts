import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brand.dto';
import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'imageURL',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id == id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (brand) {
      const idx = this.brands.findIndex((item) => item.id == id);
      this.brands[idx] = {
        ...brand,
        ...payload,
      };
      return this.brands[idx];
    }
    return null;
  }

  delete(id: number) {
    const idx = this.brands.findIndex((item) => item.id == id);
    if (idx === -1) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    const brand = this.findOne(id);
    this.brands.splice(idx, 1);
    return brand;
  }
}
