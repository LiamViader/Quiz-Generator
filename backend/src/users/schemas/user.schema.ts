import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  googleId: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop({ default: 0 })
  dailyPersonalUsage: number;

  @Prop()
  lastUsageDate: string; // Format: YYYY-MM-DD
}

export const UserSchema = SchemaFactory.createForClass(User);
