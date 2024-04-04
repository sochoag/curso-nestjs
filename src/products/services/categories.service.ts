import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dto';
import { Category } from 'src/products/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll() {
    return await this.categoryModel.find();
  }

  async findOne(id: string) {
    const category = this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(payload: CreateCategoryDto) {
    const newCategory = new this.categoryModel(payload);
    return await newCategory.save();
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async delete(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }
}
