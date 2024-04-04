import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Product } from 'src/products/entities/product.entity';
import mongoose from 'mongoose';

@Schema()
export class Order {
  @Prop()
  date: Date;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
