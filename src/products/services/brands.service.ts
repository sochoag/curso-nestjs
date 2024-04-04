import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll() {
    return await this.brandModel.find();
  }

  async findOne(id: string) {
    const brand = this.brandModel.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async create(payload: CreateBrandDto) {
    const newBrand = new this.brandModel(payload);
    return await newBrand.save();
  }

  async update(id: string, payload: UpdateBrandDto) {
    const brand = await this.brandModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async delete(id: string) {
    const brand = await this.brandModel.findByIdAndDelete(id);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }
}
