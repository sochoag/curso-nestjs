import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id == id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (category) {
      const idx = this.categories.findIndex((item) => item.id == id);
      this.categories[idx] = {
        ...category,
        ...payload,
      };
      return this.categories[idx];
    }
    return null;
  }

  delete(id: number) {
    const idx = this.categories.findIndex((item) => item.id == id);
    if (idx === -1) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    const category = this.findOne(id);
    this.categories.splice(idx, 1);
    return category;
  }
}
