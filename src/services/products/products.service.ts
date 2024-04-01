import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Descripcion',
      price: 10,
      stock: 100,
      image: "imageURL"
    }
  ]

  findAll() {
    return this.products
  }

  findOne(id: number) {
    return this.products.find(item => item.id == id)
  }

  create(payload: any) {
    this.counterId++
    const newProduct = {
      id: this.counterId
      ...payload
    }
    this.products.push(newProduct)
    return newProduct
  }

  update(id: number, payload: any) {
    const idx = this.products.findIndex(item => item.id == id)

    if (idx === undefined) return undefined

    this.products[idx] = { id: id, ...payload }
  }

  delete(id: number) {
    const product = this.findOne(id)
    const idx = this.products.findIndex(item => item.id == id)
    if (idx === undefined) return undefined
    this.products.splice(idx, 1)
    return product
  }
}
