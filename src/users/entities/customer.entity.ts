import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop()
  id: number;
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop()
  phone: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
