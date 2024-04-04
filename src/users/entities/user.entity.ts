import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  id: number;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
