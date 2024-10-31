import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type HistoryDocument = HydratedDocument<History>;

@Schema({ timestamps: true })
export class History extends Document {
  @Prop()
  title: string;

  @Prop()
  plot: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);

HistorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});
