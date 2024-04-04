import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }
      return await this.productModel.find().skip(offset).limit(limit);
    }
    return await this.productModel.find();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    // const newProduct = {
    //   ...payload,
    // };
    // const result = await this.productModel.create(newProduct);
    // return result;
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }

  async update(id: string, payload: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      {
        $set: payload,
      },
      { new: true },
    );
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
}
