import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DailyUsageDocument = HydratedDocument<DailyUsage>;

@Schema()
export class DailyUsage {
  @Prop({ required: true, unique: true })
  date: string; // Format: YYYY-MM-DD

  @Prop({ default: 0 })
  count: number;
}

export const DailyUsageSchema = SchemaFactory.createForClass(DailyUsage);
